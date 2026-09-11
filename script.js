/* =========================================
   CONFIG
========================================= */

/* where a client's finished selection gets
   emailed when they hit "Send to Agency" -
   change this to whichever inbox should
   receive submissions */
const SUBMIT_EMAIL = "bhushan@impacgo.com";

/* optional: paste a form-submission endpoint
   here (e.g. a free Formspree/Getform form
   action URL) to have "Send to Agency" post
   the selection directly and silently -
   no dependency on the client's device having
   a mail app configured. Leave this as an
   empty string to fall back to opening the
   client's email app instead (still works,
   just requires them to hit send there). */
const FORM_ENDPOINT = "";

/* optional: your Calendly / Cal.com booking
   link. When set, a "Book a call" option
   appears in the selection summary so a
   client can skip waiting on your reply and
   grab time with you directly. Leave empty
   to hide it. */
const BOOKING_URL = "";

/* optional: an honest turnaround promise
   shown to the client before they submit,
   e.g. "We reply within 4 business hours."
   Leave empty to hide it - never fill this
   in with something that isn't true. */
const RESPONSE_TIME_PROMISE = "";

/* optional: real photography/illustration for
   the image-driven styles below (Cinematic
   Editorial, Illustrated Product UI, Scrapbook
   Collage). Paste a URL, or a relative path to
   a file you've added to this project folder
   (e.g. "images/hero-photo.jpg"), into any slot
   below. Leave a slot empty to keep a tasteful
   gradient placeholder there instead - nothing
   breaks either way, so it's safe to fill these
   in one at a time as you get real assets. */
const STYLE_IMAGES = {

    cinematic: {
        hero: "images/cinematic-hero.jpg",
    },

    illustrated: {
        card1: "images/illustrated-card1.jpg",
        card2: "images/illustrated-card2.jpg",
        card3: "images/illustrated-card3.jpg",
    },

    scrapbook: {
        card1: "images/scrapbook-card1.jpg",
        card2: "images/scrapbook-card2.jpg",
        card3: "images/scrapbook-card3.jpg",
    },

    glassmorphism: {
        hero: "images/glass-hero.jpg",
    },

    liquidglass: {
        hero: "images/glass-hero.jpg",
    },

    aurora: {
        hero: "images/aurora-hero.jpg",
    },

    organic: {
        hero: "images/organic-hero.jpg",
    },

    editorial: {
        hero: "images/editorial-hero.jpg",
    },

    futuristic: {
        hero: "images/futuristic-hero.jpg",
    },

};

function applyStyleImages() {

    Object.entries(STYLE_IMAGES).forEach(([styleKey, slots]) => {

        Object.entries(slots).forEach(([slot, url]) => {

            if (!url) {

                return;

            }

            document.documentElement.style.setProperty(
                `--img-${styleKey}-${slot}`,
                `url("${url}")`
            );

        });

    });

}


/* =========================================
   CLIENT PERSONALIZATION
   (send each client their own link, e.g.
   yoursite.com/?client=Acme+Inc&contact=Sarah
   &logo=https://acme.com/logo.png - the page
   then tailors itself to that client) ---- */

function escapeHtml(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}

const urlParams =
    new URLSearchParams(window.location.search);

const clientInfo = {

    client: (urlParams.get("client") || "").trim().slice(0, 60),

    contact: (urlParams.get("contact") || "").trim().slice(0, 60),

    logo: (urlParams.get("logo") || "").trim(),

};

function slugifyDomain(name) {

    const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "");

    return slug ? `${slug}.com` : "yourproduct.com";

}

function applyClientPersonalization() {

    if (!clientInfo.client && !clientInfo.contact) {

        return;

    }

    if (clientInfo.client) {

        document.title =
            `${clientInfo.client} · UI Style Playground`;

        const subtitle =
            document.getElementById("brandSubtitle");

        if (subtitle) {

            subtitle.textContent =
                `Prepared for ${clientInfo.client}`;

        }

        const logoEl =
            document.getElementById("previewLogo");

        if (logoEl) {

            if (/^https?:\/\//i.test(clientInfo.logo)) {

                logoEl.innerHTML = "";

                const img =
                    document.createElement("img");

                img.src = clientInfo.logo;

                img.alt = clientInfo.client;

                img.className = "preview-logo-img";

                logoEl.appendChild(img);

            } else {

                logoEl.textContent = clientInfo.client;

            }

        }

        const addressEl =
            document.getElementById("frameAddress");

        if (addressEl) {

            addressEl.textContent =
                slugifyDomain(clientInfo.client);

        }

        const kickerEl =
            document.getElementById("kickerText");

        if (kickerEl) {

            kickerEl.textContent =
                `${clientInfo.client} Design Workshop`;

        }

        const introEl =
            document.getElementById("introBrandLine");

        if (introEl) {

            introEl.textContent =
                `Explore different UI styles, experiment with colors and select the visual direction that best represents ${clientInfo.client}'s brand.`;

        }

    }

    const decisionHeading =
        document.getElementById("decisionHeading");

    if (decisionHeading) {

        if (clientInfo.client && clientInfo.contact) {

            decisionHeading.textContent =
                `Hi ${clientInfo.contact}, what does ${clientInfo.client}'s brand feel like?`;

        } else if (clientInfo.client) {

            decisionHeading.textContent =
                `What does ${clientInfo.client}'s brand feel like?`;

        } else if (clientInfo.contact) {

            decisionHeading.textContent =
                `Hi ${clientInfo.contact}, what does your brand feel like?`;

        }

    }

}


/* =========================================
   OPTIONAL EXTRAS
   (booking link + response-time promise -
   both configured above, both stay hidden
   unless you actually set them) ----------
========================================= */

function setupOptionalExtras() {

    if (RESPONSE_TIME_PROMISE) {

        const note =
            document.getElementById("responseTimeNote");

        note.textContent =
            RESPONSE_TIME_PROMISE;

        note.classList.remove("hidden");

    }

    if (BOOKING_URL) {

        const bookLink =
            document.getElementById("bookCallLink");

        bookLink.href = BOOKING_URL;

        bookLink.textContent =
            "📅 Prefer to talk? Book a call";

        bookLink.classList.remove("hidden");

    }

}


/* =========================================
   RESTORE SHARED STATE FROM URL
   (the counterpart to "Copy Shareable Link" -
   reads back the style/colors/font/blocks a
   link was generated with, so nothing a
   client picked is lost by closing the tab) -
========================================= */

function applyState(state) {

    if (!state) {

        return;

    }

    if (state.style && styles[state.style]) {

        selectStyle(state.style);

    }

    let colorsChanged = false;

    if (validHex(state.primary)) {

        selectedColors.primary =
            state.primary.toUpperCase();

        colorsChanged = true;

    }

    if (validHex(state.secondary)) {

        selectedColors.secondary =
            state.secondary.toUpperCase();

        colorsChanged = true;

    }

    if (validHex(state.background)) {

        selectedColors.background =
            state.background.toUpperCase();

        colorsChanged = true;

    }

    if (colorsChanged) {

        primaryColor.value = selectedColors.primary;
        primaryHex.value = selectedColors.primary;

        secondaryColor.value = selectedColors.secondary;
        secondaryHex.value = selectedColors.secondary;

        backgroundColor.value = selectedColors.background;
        backgroundHex.value = selectedColors.background;

        updateColors();

    }

    if (state.font) {

        applyFont(state.font);

    }

    if (state.blocks && state.blocks.length) {

        state.blocks.forEach(key => addElementBlock(key.trim()));

    }

}

function restoreSharedState() {

    applyState({

        style: urlParams.get("style"),

        primary: urlParams.get("primary"),

        secondary: urlParams.get("secondary"),

        background: urlParams.get("background"),

        font: urlParams.get("font"),

        blocks: (urlParams.get("blocks") || "")
            .split(",")
            .map(key => key.trim())
            .filter(Boolean),

    });

}


/* =========================================
   ICON SET
   (compact line icons, one per style)
========================================= */

const ICONS = {

    minimalism:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="7"/></svg>`,

    glassmorphism:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="7" width="12" height="12" rx="3" opacity=".5"/><rect x="8" y="4" width="12" height="12" rx="3"/></svg>`,

    neumorphism:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="6"/><circle cx="12" cy="12" r="3"/></svg>`,

    bento:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="10" height="18" rx="2.5"/><rect x="15" y="3" width="6" height="8" rx="2"/><rect x="15" y="13" width="6" height="8" rx="2"/></svg>`,

    material:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="5" width="14" height="10" rx="1.5"/><line x1="5" y1="18" x2="19" y2="18"/><line x1="7" y1="20.5" x2="17" y2="20.5"/></svg>`,

    flat:
        `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>`,

    dark:
        `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/></svg>`,

    aurora:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 15c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/><path d="M3 9c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity=".5"/></svg>`,

    gradient:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 16 16 4" opacity=".6"/></svg>`,

    claymorphism:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4c4 0 8 2 8 7s-3 9-8 9-8-4-8-9 4-7 8-7z"/></svg>`,

    neobrutalism:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="7" width="12" height="12"/><rect x="5" y="5" width="12" height="12"/></svg>`,

    brutalism:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16"/><line x1="4" y1="10" x2="20" y2="10"/></svg>`,

    organic:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20c-4 0-7-3-7-7 0-3 2-5 4-7 1-1 2-2 3-2s2 1 3 2c2 2 4 4 4 7 0 4-3 7-7 7z"/></svg>`,

    editorial:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="5" y1="6" x2="19" y2="6" stroke-width="2.2"/><line x1="5" y1="11" x2="19" y2="11"/><line x1="5" y1="15" x2="14" y2="15"/></svg>`,

    futuristic:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l7 4v10l-7 4-7-4V7z"/><circle cx="12" cy="12" r="2"/></svg>`,

    depth3d:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5L12 12l8-4.5" opacity=".6"/><path d="M12 12v9" opacity=".6"/></svg>`,

    liquidglass:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3c4 5 6 8 6 11a6 6 0 1 1-12 0c0-3 2-6 6-11z"/></svg>`,

    grainy:
        `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="6" cy="7" r="1.2"/><circle cx="12" cy="5" r="1"/><circle cx="17" cy="8" r="1.3"/><circle cx="8" cy="13" r="1"/><circle cx="15" cy="14" r="1.2"/><circle cx="6" cy="18" r="1"/><circle cx="13" cy="18" r="1.3"/><circle cx="18" cy="17" r="1"/></svg>`,

    y2k:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><path d="M8 9c1-2 3-3 5-2" opacity=".6"/></svg>`,

    cinematic:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2.5v9L17 14"/></svg>`,

    illustrated:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5.5-5.5L7 19"/></svg>`,

    scrapbook:
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="3" width="12" height="15" rx="1" transform="rotate(-6 11 10)"/><rect x="7" y="5" width="12" height="15" rx="1" transform="rotate(6 13 12)"/></svg>`

};


/* =========================================
   UI STYLE DATA
========================================= */

const styles = {

    minimalism: {

        name: "Minimalism",

        icon: ICONS.minimalism,

        description:
            "A clean and simple visual language focused on clarity, whitespace and usability.",

        longDescription:
            "Minimalism removes unnecessary visual elements and focuses on content, hierarchy, typography and usability. It is one of the safest choices for professional digital products.",

        tags: [
            "Clean",
            "Simple",
            "Professional"
        ],

        bestFor: [
            "SaaS applications",
            "Corporate websites",
            "Business dashboards",
            "Professional websites"
        ],

        industries: ["saas-tech", "corporate"],

        characteristics: [
            "Lots of whitespace",
            "Simple typography",
            "Limited visual effects",
            "Strong hierarchy"
        ]

    },


    glassmorphism: {

        name: "Glassmorphism",

        icon: ICONS.glassmorphism,

        description:
            "Transparent surfaces, background blur, subtle borders and layered depth.",

        longDescription:
            "Glassmorphism creates a premium modern appearance by using translucent surfaces, background blur and subtle borders. It works especially well when combined with gradients and imagery.",

        tags: [
            "Modern",
            "Premium",
            "Transparent"
        ],

        bestFor: [
            "AI products",
            "SaaS platforms",
            "Modern dashboards",
            "Premium websites"
        ],

        industries: ["saas-tech", "ai-tech"],

        characteristics: [
            "Frosted glass",
            "Background blur",
            "Transparency",
            "Layered surfaces"
        ]

    },


    neumorphism: {

        name: "Neumorphism",

        icon: ICONS.neumorphism,

        description:
            "Soft raised and pressed surfaces created with subtle shadows.",

        longDescription:
            "Neumorphism combines light and dark shadows to make interface elements appear softly raised from the background.",

        tags: [
            "Soft",
            "3D",
            "Tactile"
        ],

        bestFor: [
            "Mobile applications",
            "Control panels",
            "Interactive controls",
            "Personal tools"
        ],

        industries: ["mobile-apps"],

        characteristics: [
            "Soft shadows",
            "Raised controls",
            "Pressed elements",
            "Low contrast"
        ]

    },


    bento: {

        name: "Bento UI",

        icon: ICONS.bento,

        description:
            "Information organized into modular cards inspired by Japanese bento boxes.",

        longDescription:
            "Bento UI organizes content into visually distinct rectangular blocks. Each block can contain a different feature, metric or piece of information.",

        tags: [
            "Cards",
            "Modular",
            "Modern"
        ],

        bestFor: [
            "SaaS dashboards",
            "Product landing pages",
            "Feature sections",
            "AI applications"
        ],

        industries: ["saas-tech", "ai-tech"],

        characteristics: [
            "Modular cards",
            "Flexible layouts",
            "Clear grouping",
            "Strong hierarchy"
        ]

    },


    material: {

        name: "Material Design",

        icon: ICONS.material,

        description:
            "Structured interface design using elevation, cards, components and clear interaction states.",

        longDescription:
            "Material Design uses consistent components, spacing, elevation and motion to create predictable and highly usable interfaces.",

        tags: [
            "Structured",
            "Systematic",
            "Usable"
        ],

        bestFor: [
            "Android applications",
            "Enterprise apps",
            "Dashboards",
            "Large applications"
        ],

        industries: ["mobile-apps", "corporate"],

        characteristics: [
            "Elevation",
            "Cards",
            "Consistent spacing",
            "Clear interaction states"
        ]

    },


    flat: {

        name: "Flat Design",

        icon: ICONS.flat,

        description:
            "Simple two-dimensional elements without unnecessary shadows or 3D effects.",

        longDescription:
            "Flat Design emphasizes clarity and usability through simple shapes, typography, icons and colors.",

        tags: [
            "Simple",
            "2D",
            "Functional"
        ],

        bestFor: [
            "Business applications",
            "Websites",
            "Mobile applications",
            "Administrative systems"
        ],

        industries: ["corporate", "mobile-apps", "ecommerce"],

        characteristics: [
            "2D elements",
            "Simple icons",
            "Bold colors",
            "Minimal effects"
        ]

    },


    dark: {

        name: "Dark Mode",

        icon: ICONS.dark,

        description:
            "Dark surfaces combined with contrasting typography and accent colors.",

        longDescription:
            "Dark UI uses deep backgrounds and bright accents to create a focused and sophisticated visual experience.",

        tags: [
            "Dark",
            "Modern",
            "Focused"
        ],

        bestFor: [
            "Developer tools",
            "AI platforms",
            "Analytics dashboards",
            "Gaming"
        ],

        industries: ["ai-tech", "saas-tech"],

        characteristics: [
            "Dark surfaces",
            "High contrast",
            "Bright accents",
            "Reduced visual glare"
        ]

    },


    aurora: {

        name: "Aurora UI",

        icon: ICONS.aurora,

        description:
            "Soft colorful gradients and glowing backgrounds inspired by the Northern Lights.",

        longDescription:
            "Aurora UI uses multiple blurred gradients and vibrant colors to create a futuristic and atmospheric appearance.",

        tags: [
            "Colorful",
            "Glowing",
            "Futuristic"
        ],

        bestFor: [
            "AI websites",
            "Tech startups",
            "Creative portfolios",
            "Product landing pages"
        ],

        industries: ["startups-marketing", "ai-tech"],

        characteristics: [
            "Blurred gradients",
            "Color transitions",
            "Soft glow",
            "Atmospheric backgrounds"
        ]

    },


    gradient: {

        name: "Gradient UI",

        icon: ICONS.gradient,

        description:
            "Strong color transitions used to create energy and visual emphasis.",

        longDescription:
            "Gradient UI uses transitions between two or more colors to create depth, emphasis and visual personality.",

        tags: [
            "Colorful",
            "Energetic",
            "Modern"
        ],

        bestFor: [
            "Startups",
            "Marketing websites",
            "Creative products",
            "AI products"
        ],

        industries: ["startups-marketing", "creative-portfolio", "ecommerce"],

        characteristics: [
            "Color transitions",
            "Strong accents",
            "Visual energy",
            "High emphasis"
        ]

    },


    claymorphism: {

        name: "Claymorphism",

        icon: ICONS.claymorphism,

        description:
            "Soft rounded 3D-looking components with friendly shapes and depth.",

        longDescription:
            "Claymorphism makes interface components look like soft clay objects using large rounded corners and soft shadows.",

        tags: [
            "Soft",
            "Friendly",
            "3D"
        ],

        bestFor: [
            "Education apps",
            "Consumer applications",
            "Creative products",
            "Children's products"
        ],

        industries: ["mobile-apps", "wellness"],

        characteristics: [
            "Rounded shapes",
            "Soft shadows",
            "3D appearance",
            "Friendly personality"
        ]

    },


    neobrutalism: {

        name: "Neobrutalism",

        icon: ICONS.neobrutalism,

        description:
            "Bold typography, thick borders, strong shadows and high visual contrast.",

        longDescription:
            "Neobrutalism combines raw brutalist aesthetics with modern UX patterns. It is bold, memorable and intentionally unconventional.",

        tags: [
            "Bold",
            "Creative",
            "High Contrast"
        ],

        bestFor: [
            "Creative startups",
            "Portfolios",
            "Marketing websites",
            "Experimental products"
        ],

        industries: ["creative-portfolio", "startups-marketing"],

        characteristics: [
            "Thick borders",
            "Hard shadows",
            "Bold typography",
            "Strong contrast"
        ]

    },


    brutalism: {

        name: "Brutalism",

        icon: ICONS.brutalism,

        description:
            "Raw, unconventional layouts with strong typography and minimal decoration.",

        longDescription:
            "Brutalist design intentionally exposes structure and avoids polished visual conventions. It creates a raw and unconventional experience.",

        tags: [
            "Raw",
            "Bold",
            "Experimental"
        ],

        bestFor: [
            "Creative portfolios",
            "Art websites",
            "Experimental brands",
            "Design studios"
        ],

        industries: ["creative-portfolio"],

        characteristics: [
            "Raw layouts",
            "Strong typography",
            "Minimal decoration",
            "Unexpected composition"
        ]

    },


    organic: {

        name: "Organic UI",

        icon: ICONS.organic,

        description:
            "Natural curves, earthy colors and human-friendly visual shapes.",

        longDescription:
            "Organic UI uses natural forms, rounded shapes, softer compositions and colors inspired by nature.",

        tags: [
            "Natural",
            "Friendly",
            "Warm"
        ],

        bestFor: [
            "Agriculture",
            "Organic brands",
            "Food products",
            "Wellness applications"
        ],

        industries: ["wellness"],

        characteristics: [
            "Natural shapes",
            "Soft curves",
            "Earth-inspired colors",
            "Human feel"
        ]

    },


    editorial: {

        name: "Editorial UI",

        icon: ICONS.editorial,

        description:
            "Typography-led design inspired by magazines, newspapers and premium publications.",

        longDescription:
            "Editorial UI prioritizes typography, composition and storytelling. It works particularly well for premium brands and content-heavy experiences.",

        tags: [
            "Typography",
            "Premium",
            "Storytelling"
        ],

        bestFor: [
            "Luxury brands",
            "Publishing",
            "Portfolios",
            "Content websites"
        ],

        industries: ["publishing", "creative-portfolio"],

        characteristics: [
            "Large typography",
            "Strong grids",
            "Magazine layouts",
            "Editorial hierarchy"
        ]

    },


    futuristic: {

        name: "Futuristic UI",

        icon: ICONS.futuristic,

        description:
            "Dark surfaces, glowing accents, sharp details and technology-inspired visuals.",

        longDescription:
            "Futuristic UI uses dark environments, luminous accents and advanced visual effects to create a technology-focused experience.",

        tags: [
            "Futuristic",
            "Technology",
            "Advanced"
        ],

        bestFor: [
            "AI platforms",
            "Robotics",
            "Cybersecurity",
            "Technology products"
        ],

        industries: ["ai-tech", "saas-tech"],

        characteristics: [
            "Dark backgrounds",
            "Glowing accents",
            "Sharp geometry",
            "Technology aesthetic"
        ]

    },


    depth3d: {

        name: "3D Depth UI",

        icon: ICONS.depth3d,

        description:
            "Layered cards with real perspective and directional shadows, giving the interface physical depth.",

        longDescription:
            "3D Depth UI tilts interface elements in real 3D space using perspective and rotation, paired with strong directional shadows. It creates the floating, tactile feel popularized by modern WebGL and Spline-powered marketing sites, without needing WebGL.",

        tags: [
            "3D",
            "Depth",
            "Modern"
        ],

        bestFor: [
            "Product launches",
            "Tech marketing sites",
            "Portfolio showcases",
            "AI products"
        ],

        industries: ["ai-tech", "startups-marketing"],

        characteristics: [
            "Perspective transforms",
            "Directional shadows",
            "Floating layers",
            "Tactile depth"
        ]

    },


    liquidglass: {

        name: "Liquid Glass",

        icon: ICONS.liquidglass,

        description:
            "A refined, luminous evolution of glass surfaces with specular highlights and light-catching edges.",

        longDescription:
            "Liquid Glass follows Apple's newest visionOS/iOS design language. Deeper blur, brighter specular highlights and subtle refraction at panel edges create a glass surface that feels lit from within.",

        tags: [
            "Glass",
            "Luminous",
            "Premium"
        ],

        bestFor: [
            "Premium apps",
            "Consumer tech",
            "Product launches",
            "Portfolio sites"
        ],

        industries: ["saas-tech", "ai-tech"],

        characteristics: [
            "Specular highlights",
            "Deep blur",
            "Refractive edges",
            "Luminous surfaces"
        ]

    },


    grainy: {

        name: "Grainy Gradient",

        icon: ICONS.grainy,

        description:
            "Soft mesh gradients finished with a fine film-grain texture, trading the flat digital look for something printed and tactile.",

        longDescription:
            "Grainy Gradient layers a subtle noise texture over soft color-blurred gradients, a look popularized by recent startup landing pages. It softens what would otherwise be a flat, overly-digital gradient background.",

        tags: [
            "Textured",
            "Soft",
            "Trending"
        ],

        bestFor: [
            "Startup landing pages",
            "Product launches",
            "Creative portfolios",
            "SaaS marketing"
        ],

        industries: ["startups-marketing", "creative-portfolio"],

        characteristics: [
            "Mesh gradients",
            "Film grain texture",
            "Soft color blur",
            "Printed feel"
        ]

    },


    y2k: {

        name: "Y2K / Retro Futurism",

        icon: ICONS.y2k,

        description:
            "Glossy chrome surfaces, bold candy colors and chunky rounded shapes inspired by early-2000s optimism.",

        longDescription:
            "Y2K / Retro Futurism revives the glossy, saturated, chunky-shaped aesthetic of early-2000s tech and consumer products. It's deliberately loud, nostalgic and playful rather than corporate.",

        tags: [
            "Retro",
            "Glossy",
            "Playful"
        ],

        bestFor: [
            "Youth brands",
            "Consumer products",
            "Music & entertainment",
            "Creative products"
        ],

        industries: ["creative-portfolio", "startups-marketing"],

        characteristics: [
            "Glossy chrome surfaces",
            "Bold candy colors",
            "Chunky rounded shapes",
            "Playful bounce"
        ]

    },


    cinematic: {

        name: "Cinematic Editorial",

        icon: ICONS.cinematic,

        description:
            "Full-bleed photography, dramatic gradient overlays and premium serif type for a high-end brand feel.",

        longDescription:
            "Cinematic Editorial pairs full-bleed photography with a dark gradient overlay and restrained serif typography. It's the look premium agencies, luxury brands and high-end SaaS companies use to feel expensive and considered rather than templated.",

        tags: [
            "Cinematic",
            "Premium",
            "Photographic"
        ],

        bestFor: [
            "Luxury brands",
            "Premium agencies",
            "High-end SaaS",
            "Personal brands"
        ],

        industries: ["creative-portfolio", "publishing"],

        characteristics: [
            "Full-bleed photography",
            "Dark gradient overlay",
            "Serif typography",
            "Restrained accents"
        ]

    },


    illustrated: {

        name: "Illustrated Product UI",

        icon: ICONS.illustrated,

        description:
            "Friendly custom illustration in place of flat icons - the warm consumer-SaaS look used by Notion, Linear and Attio.",

        longDescription:
            "Illustrated Product UI replaces flat icon badges with small custom illustrations for each feature, giving the product a warmer, more human and more memorable feel than a purely geometric interface.",

        tags: [
            "Illustrated",
            "Friendly",
            "Consumer"
        ],

        bestFor: [
            "Consumer SaaS",
            "Onboarding flows",
            "Productivity tools",
            "Education apps"
        ],

        industries: ["saas-tech", "mobile-apps"],

        characteristics: [
            "Custom illustration",
            "Warm color palette",
            "Rounded shapes",
            "Human, approachable feel"
        ]

    },


    scrapbook: {

        name: "Scrapbook Collage",

        icon: ICONS.scrapbook,

        description:
            "Overlapping polaroid-style photo cards with a slight tilt, for a personal, handmade, lifestyle feel.",

        longDescription:
            "Scrapbook Collage arranges photography like a physical scrapbook: thick white borders, a gentle rotation and layered shadows, for brands that want to feel personal and handmade rather than corporate.",

        tags: [
            "Collage",
            "Personal",
            "Photographic"
        ],

        bestFor: [
            "Lifestyle brands",
            "Personal brands",
            "Creative portfolios",
            "Travel & hospitality"
        ],

        industries: ["creative-portfolio", "wellness"],

        characteristics: [
            "Polaroid-style framing",
            "Layered photography",
            "Gentle rotation",
            "Handmade feel"
        ]

    }

};


/* =========================================
   STATE
========================================= */

let selectedStyle = "minimalism";

let activeIndustryFilter = "all";

let selectedColors = {

    primary: "#2563EB",

    secondary: "#7C3AED",

    background: "#F8FAFC"

};


/* =========================================
   DOM ELEMENTS
========================================= */

const styleList =
    document.getElementById("styleList");

const preview =
    document.getElementById("preview");

const styleName =
    document.getElementById("styleName");

const styleDescription =
    document.getElementById("styleDescription");

const styleTags =
    document.getElementById("styleTags");

const explanationTitle =
    document.getElementById("explanationTitle");

const longDescription =
    document.getElementById("longDescription");

const bestFor =
    document.getElementById("bestFor");

const characteristics =
    document.getElementById("characteristics");

const styleIconLg =
    document.getElementById("styleIconLg");

const frameBadge =
    document.getElementById("frameBadge");

const revenueCount =
    document.getElementById("revenueCount");

const growthCount =
    document.getElementById("growthCount");

const primaryColor =
    document.getElementById("primaryColor");

const secondaryColor =
    document.getElementById("secondaryColor");

const backgroundColor =
    document.getElementById("backgroundColor");

const primaryHex =
    document.getElementById("primaryHex");

const secondaryHex =
    document.getElementById("secondaryHex");

const backgroundHex =
    document.getElementById("backgroundHex");


/* =========================================
   CREATE STYLE LIST
========================================= */

let activePill = null;

let pillReady = false;

function renderStyleList() {

    const pill = activePill || document.createElement("div");

    pill.className = "active-pill";

    styleList.innerHTML = "";

    styleList.appendChild(pill);

    activePill = pill;

    Object.entries(styles).forEach(
        ([key, style]) => {

            const matchesFilter =
                activeIndustryFilter === "all" ||
                style.industries.includes(activeIndustryFilter) ||
                key === selectedStyle;

            if (!matchesFilter) {

                return;

            }

            const button =
                document.createElement("button");

            button.className =
                "style-item";

            if (key === selectedStyle) {

                button.classList.add("active");

            }

            button.innerHTML = `
                <span class="style-icon">${style.icon}</span>
                <span class="style-item-text">
                    <span class="style-item-name">${style.name}</span>
                    <span class="style-item-tag">${style.tags.slice(0, 2).join(" · ")}</span>
                </span>
            `;

            button.addEventListener(
                "click",
                () => selectStyle(key)
            );

            styleList.appendChild(button);

        }
    );

    movePill();

}


/* =========================================
   INDUSTRY QUICK-FILTER
   (each style already lists what it's best
   for - this just surfaces that as a filter
   so a client can jump straight to styles
   suited to their kind of business) --------
========================================= */

document.querySelectorAll(".industry-chip").forEach(chip => {

    chip.addEventListener("click", () => {

        activeIndustryFilter =
            chip.dataset.industry;

        document.querySelectorAll(".industry-chip").forEach(c => {

            c.classList.toggle(
                "active",
                c === chip
            );

        });

        renderStyleList();

    });

});


/* =========================================
   SLIDING ACTIVE INDICATOR
========================================= */

function movePill() {

    const active =
        styleList.querySelector(".style-item.active");

    if (!activePill || !active) {

        return;

    }

    if (!pillReady) {

        activePill.style.transition = "none";

    }

    activePill.style.transform =
        `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;

    activePill.style.width =
        `${active.offsetWidth}px`;

    activePill.style.height =
        `${active.offsetHeight}px`;

    if (!pillReady) {

        void activePill.offsetWidth;

        activePill.style.transition = "";

        pillReady = true;

    }

}


/* =========================================
   SIDEBAR TABS
   (styles / colors / fonts / elements panels
   sharing the same side nav)
========================================= */

const sidebarTabs =
    document.querySelectorAll(".sidebar-tab");

const sidebarPanels =
    document.querySelectorAll(".sidebar-panel");

function activateSidebarTab(tabKey) {

    sidebarTabs.forEach(tab => {

        const isActive = tab.dataset.tab === tabKey;

        tab.classList.toggle("active", isActive);

        tab.setAttribute(
            "aria-selected",
            isActive ? "true" : "false"
        );

    });

    sidebarPanels.forEach(panel => {

        panel.classList.toggle(
            "active",
            panel.dataset.panel === tabKey
        );

    });

    /* the active-pill's offsets are only
       measurable while the styles panel
       is actually visible */

    if (tabKey === "styles") {

        movePill();

    }

}

sidebarTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => activateSidebarTab(tab.dataset.tab)
    );

});


/* =========================================
   SELECT STYLE
========================================= */

function selectStyle(key) {

    selectedStyle = key;

    const style = styles[key];

    preview.className =
        `preview ${key}`;

    preview.style.animation = "none";

    void preview.offsetWidth;

    preview.style.animation = "";

    styleIconLg.innerHTML =
        style.icon;

    frameBadge.textContent =
        `Previewing: ${style.name}`;

    styleName.textContent =
        style.name;

    styleDescription.textContent =
        style.description;

    explanationTitle.textContent =
        style.name;

    longDescription.textContent =
        style.longDescription;


    /* Tags */

    styleTags.innerHTML = "";

    style.tags.forEach(tag => {

        const span =
            document.createElement("span");

        span.textContent = tag;

        styleTags.appendChild(span);

    });


    /* Best For */

    bestFor.innerHTML = "";

    style.bestFor.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        bestFor.appendChild(li);

    });


    /* Characteristics */

    characteristics.innerHTML = "";

    style.characteristics.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        characteristics.appendChild(li);

    });


    renderStyleList();

    refreshPreviewNumbers();

    saveStateToStorage();

}


/* =========================================
   ANIMATED COUNT-UP
========================================= */

function animateCount(el, duration = 1000) {

    if (!el) return;

    const target = parseFloat(el.dataset.count);

    const decimals = parseInt(el.dataset.decimals || "0", 10);

    const prefix = el.dataset.prefix || "";

    const start = performance.now();

    function format(value) {

        return prefix + (
            decimals > 0
                ? value.toFixed(decimals)
                : Math.round(value).toLocaleString("en-IN")
        );

    }

    function tick(now) {

        const progress =
            Math.min((now - start) / duration, 1);

        const eased =
            1 - Math.pow(1 - progress, 3);

        el.textContent = format(target * eased);

        if (progress < 1) {

            requestAnimationFrame(tick);

        } else {

            el.textContent = format(target);

        }

    }

    requestAnimationFrame(tick);

}


/* =========================================
   PREVIEW NUMBERS + CHART REGROW
========================================= */

function refreshPreviewNumbers() {

    animateCount(revenueCount);

    animateCount(growthCount);

    const bars =
        preview.querySelectorAll(".chart i");

    bars.forEach(bar => {

        bar.style.height = "0%";

    });

    void preview.offsetWidth;

    requestAnimationFrame(() => {

        bars.forEach(bar => {

            bar.style.removeProperty("height");

        });

    });

}


/* =========================================
   UPDATE COLORS
========================================= */

function updateColors() {

    document.documentElement.style
        .setProperty(
            "--primary",
            selectedColors.primary
        );

    document.documentElement.style
        .setProperty(
            "--secondary",
            selectedColors.secondary
        );

    document.documentElement.style
        .setProperty(
            "--background",
            selectedColors.background
        );

    checkColorContrast();

    saveStateToStorage();

}


/* =========================================
   VALID HEX
========================================= */

function validHex(value) {

    return /^#[0-9A-F]{6}$/i.test(value);

}


/* =========================================
   ACCESSIBILITY: CONTRAST CHECK
   (WCAG relative-luminance contrast ratio -
   warns if a chosen color combo would be
   hard to read, before it ships) -----------
========================================= */

function hexToRgb(hex) {

    const clean = hex.replace("#", "");

    return {
        r: parseInt(clean.substring(0, 2), 16),
        g: parseInt(clean.substring(2, 4), 16),
        b: parseInt(clean.substring(4, 6), 16),
    };

}

function relativeLuminance({ r, g, b }) {

    const [rs, gs, bs] = [r, g, b].map(channel => {

        const c = channel / 255;

        return c <= 0.03928
            ? c / 12.92
            : Math.pow((c + 0.055) / 1.055, 2.4);

    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;

}

function contrastRatio(hexA, hexB) {

    const lumA = relativeLuminance(hexToRgb(hexA));

    const lumB = relativeLuminance(hexToRgb(hexB));

    const lighter = Math.max(lumA, lumB);

    const darker = Math.min(lumA, lumB);

    return (lighter + 0.05) / (darker + 0.05);

}

function checkColorContrast() {

    const warningEl =
        document.getElementById("contrastWarning");

    if (!warningEl) {

        return;

    }

    const AA_THRESHOLD = 4.5;

    const vsWhite =
        contrastRatio(selectedColors.primary, "#FFFFFF");

    const vsBackground =
        contrastRatio(selectedColors.primary, selectedColors.background);

    const issues = [];

    if (vsWhite < AA_THRESHOLD) {

        issues.push(
            `primary on white text is ${vsWhite.toFixed(1)}:1`
        );

    }

    if (vsBackground < AA_THRESHOLD) {

        issues.push(
            `primary on your background is ${vsBackground.toFixed(1)}:1`
        );

    }

    if (issues.length) {

        warningEl.innerHTML =
            `⚠ <strong>Contrast check:</strong> ${issues.join(" and ")} — below the WCAG AA minimum of 4.5:1. Consider a darker or more saturated shade for readability.`;

        warningEl.classList.remove("hidden");

    } else {

        warningEl.classList.add("hidden");

    }

}


/* =========================================
   COLOR INPUT SETUP
========================================= */

function setupColorInput(
    colorInput,
    hexInput,
    key
) {

    colorInput.addEventListener(
        "input",
        () => {

            selectedColors[key] =
                colorInput.value.toUpperCase();

            hexInput.value =
                selectedColors[key];

            updateColors();

        }
    );


    hexInput.addEventListener(
        "change",
        () => {

            let value =
                hexInput.value.trim();

            if (!value.startsWith("#")) {

                value = "#" + value;

            }

            value =
                value.toUpperCase();

            if (!validHex(value)) {

                hexInput.value =
                    selectedColors[key];

                return;

            }

            selectedColors[key] =
                value;

            colorInput.value =
                value;

            updateColors();

        }
    );

}


setupColorInput(
    primaryColor,
    primaryHex,
    "primary"
);


setupColorInput(
    secondaryColor,
    secondaryHex,
    "secondary"
);


setupColorInput(
    backgroundColor,
    backgroundHex,
    "background"
);


/* =========================================
   COLOR PRESETS
========================================= */

document.querySelectorAll(".preset")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedColors.primary =
                    button.dataset.primary;

                selectedColors.secondary =
                    button.dataset.secondary;

                selectedColors.background =
                    button.dataset.background;


                primaryColor.value =
                    selectedColors.primary;

                primaryHex.value =
                    selectedColors.primary;

                secondaryColor.value =
                    selectedColors.secondary;

                secondaryHex.value =
                    selectedColors.secondary;

                backgroundColor.value =
                    selectedColors.background;

                backgroundHex.value =
                    selectedColors.background;


                updateColors();

            }
        );

    });


/* =========================================
   RESET COLORS
========================================= */

document.getElementById(
    "resetColors"
).addEventListener(
    "click",
    () => {

        selectedColors = {

            primary: "#2563EB",

            secondary: "#7C3AED",

            background: "#F8FAFC"

        };

        primaryColor.value =
            selectedColors.primary;

        primaryHex.value =
            selectedColors.primary;

        secondaryColor.value =
            selectedColors.secondary;

        secondaryHex.value =
            selectedColors.secondary;

        backgroundColor.value =
            selectedColors.background;

        backgroundHex.value =
            selectedColors.background;

        updateColors();

    }
);


/* =========================================
   SELECT STYLE BUTTON
========================================= */

document.getElementById(
    "selectStyle"
).addEventListener(
    "click",
    () => {

        openSummaryModal();

    }
);


/* =========================================
   SUMMARY MODAL
========================================= */

const modal =
    document.getElementById("summaryModal");

const summaryContent =
    document.getElementById("summaryContent");


/* the list of extra sections a client
   dragged into the preview (testimonial,
   pricing, etc), read straight off the DOM
   so it always matches what's on screen */

function getAddedBlockLabels() {

    return Array.from(
        previewContent.querySelectorAll(
            ".added-block .block-label"
        )
    ).map(el => el.textContent.trim());

}


function createSummary() {

    const style =
        styles[selectedStyle];

    const addedBlocks =
        getAddedBlockLabels();

    const rows = [];

    if (clientInfo.client) {

        rows.push(`
            <div class="summary-row">
                <span>Client</span>
                <strong>${escapeHtml(clientInfo.client)}</strong>
            </div>
        `);

    }

    if (clientInfo.contact) {

        rows.push(`
            <div class="summary-row">
                <span>Contact</span>
                <strong>${escapeHtml(clientInfo.contact)}</strong>
            </div>
        `);

    }

    rows.push(`
        <div class="summary-row">
            <span>Selected UI Style</span>
            <strong>${style.name}</strong>
        </div>

        <div class="summary-row">
            <span>Primary Color</span>
            <strong>${selectedColors.primary}</strong>
        </div>

        <div class="summary-row">
            <span>Secondary Color</span>
            <strong>${selectedColors.secondary}</strong>
        </div>

        <div class="summary-row">
            <span>Background</span>
            <strong>${selectedColors.background}</strong>
        </div>

        <div class="summary-row">
            <span>Font</span>
            <strong>${currentFontLabel.textContent.trim()}</strong>
        </div>

        <div class="summary-row">
            <span>Best For</span>
            <strong>
                ${style.bestFor.join(", ")}
            </strong>
        </div>
    `);

    if (addedBlocks.length) {

        rows.push(`
            <div class="summary-row">
                <span>Extra Sections</span>
                <strong>${addedBlocks.join(", ")}</strong>
            </div>
        `);

    }

    summaryContent.innerHTML =
        rows.join("");

}


function openSummaryModal(options = {}) {

    createSummary();

    hideSubmitStatus();

    document.getElementById("shareLink").textContent =
        "🔗 Copy Shareable Link";

    document.getElementById("summaryHeading").textContent =
        options.exitIntent
            ? "Don't lose your picks!"
            : "Selected Design Direction";

    modal.classList.remove(
        "hidden"
    );

}


document.getElementById(
    "summaryBtn"
).addEventListener(
    "click",
    () => {

        openSummaryModal();

    }
);


/* =========================================
   CLOSE MODAL
========================================= */

document.getElementById(
    "closeModal"
).addEventListener(
    "click",
    () => {

        modal.classList.add(
            "hidden"
        );

    }
);


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            modal.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================
   SHARED SUMMARY TEXT
   (used by both "Copy Summary" and
   "Send to Agency" so the two never
   drift out of sync)
========================================= */

function buildSummaryText() {

    const style =
        styles[selectedStyle];

    const addedBlocks =
        getAddedBlockLabels();

    const lines = [
        "CLIENT UI DESIGN SELECTION",
        "",
    ];

    if (clientInfo.client) {

        lines.push(`Client: ${clientInfo.client}`);

    }

    if (clientInfo.contact) {

        lines.push(`Contact: ${clientInfo.contact}`);

    }

    if (clientInfo.client || clientInfo.contact) {

        lines.push("");

    }

    lines.push(
        "UI Style:",
        style.name,
        "",
        "Primary Color:",
        selectedColors.primary,
        "",
        "Secondary Color:",
        selectedColors.secondary,
        "",
        "Background:",
        selectedColors.background,
        "",
        "Font:",
        currentFontLabel.textContent.trim(),
        "",
        "Best For:",
        style.bestFor.join(", "),
        "",
        "Visual Characteristics:",
        style.characteristics.join(", ")
    );

    if (addedBlocks.length) {

        lines.push(
            "",
            "Extra Sections Added:",
            addedBlocks.join(", ")
        );

    }

    return lines.join("\n");

}


/* =========================================
   COPY SUMMARY
========================================= */

document.getElementById(
    "copySummary"
).addEventListener(
    "click",
    async () => {

        const summary =
            buildSummaryText();

        try {

            await navigator.clipboard.writeText(
                summary
            );

            document.getElementById(
                "copySummary"
            ).textContent =
                "✓ Copied";

            setTimeout(() => {

                document.getElementById(
                    "copySummary"
                ).textContent =
                    "⧉ Copy Summary";

            }, 1800);

        } catch {

            alert(summary);

        }

    }
);


/* =========================================
   SHAREABLE LINK
   (encodes the current style, colors, font
   and added blocks into the URL so a client
   can send their exact picks to a co-founder,
   bookmark them, or pick up later - nothing
   is lost by just closing the tab) ---------
========================================= */

function getCurrentState() {

    const fontStack =
        preview.classList.contains("font-overridden")
            ? preview.style.getPropertyValue("--preview-font").trim()
            : "";

    const blockKeys =
        Array.from(
            previewContent.querySelectorAll(".added-block")
        ).map(el => el.dataset.blockKey);

    return {
        style: selectedStyle,
        primary: selectedColors.primary,
        secondary: selectedColors.secondary,
        background: selectedColors.background,
        font: fontStack,
        blocks: blockKeys,
    };

}

function buildShareUrl() {

    const url =
        new URL(window.location.href);

    const params =
        url.searchParams;

    const state =
        getCurrentState();

    params.set("style", state.style);

    params.set("primary", state.primary);

    params.set("secondary", state.secondary);

    params.set("background", state.background);

    if (state.font) {

        params.set("font", state.font);

    } else {

        params.delete("font");

    }

    if (state.blocks.length) {

        params.set("blocks", state.blocks.join(","));

    } else {

        params.delete("blocks");

    }

    return url.toString();

}


/* =========================================
   SESSION RECOVERY
   (autosaves progress locally so a client
   who closes the tab without sending or
   copying a link can still pick up where
   they left off, on the same device) -------
========================================= */

const STORAGE_KEY = "uiStylePlaygroundState";

let initComplete = false;

let hasInteracted = false;

let hasSecuredPicks = false;

function saveStateToStorage() {

    /* skip entirely during the initial load
       sequence - otherwise applying defaults
       (or a shared link's state) would stomp
       on a previous session's save before
       maybeShowResumeBanner() ever gets to
       read it */

    if (!initComplete) {

        return;

    }

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(getCurrentState())
        );

    } catch {

        /* localStorage unavailable (private
           browsing, storage disabled) - the
           tool still works, it just won't
           remember this session */

    }

    hasInteracted = true;

}

function loadStateFromStorage() {

    try {

        const raw =
            localStorage.getItem(STORAGE_KEY);

        return raw ? JSON.parse(raw) : null;

    } catch {

        return null;

    }

}

function clearStoredState() {

    try {

        localStorage.removeItem(STORAGE_KEY);

    } catch {

        /* nothing to clean up */

    }

}

function maybeShowResumeBanner() {

    /* an explicit shared link always wins -
       don't second-guess it with a saved
       session from a previous visit */

    if (urlParams.get("style")) {

        return;

    }

    const saved =
        loadStateFromStorage();

    if (!saved) {

        return;

    }

    const banner =
        document.getElementById("resumeBanner");

    if (!banner) {

        return;

    }

    banner.classList.remove("hidden");

    document.getElementById("resumeBtn")
        .addEventListener("click", () => {

            applyState(saved);

            banner.classList.add("hidden");

        }, { once: true });

    document.getElementById("dismissResumeBtn")
        .addEventListener("click", () => {

            banner.classList.add("hidden");

        }, { once: true });

}


/* =========================================
   EXIT-INTENT SAVE PROMPT
   (desktop only - there's no equivalent
   "about to leave" signal on touch devices.
   Fires at most once, and only if the
   client actually changed something and
   hasn't already sent or copied their picks) -
========================================= */

let exitIntentShown = false;

document.addEventListener("mouseleave", event => {

    if (exitIntentShown || !hasInteracted || hasSecuredPicks) {

        return;

    }

    if (event.clientY > 0) {

        return;

    }

    exitIntentShown = true;

    openSummaryModal({ exitIntent: true });

});


document.getElementById(
    "shareLink"
).addEventListener(
    "click",
    async () => {

        const url =
            buildShareUrl();

        const btn =
            document.getElementById("shareLink");

        hasSecuredPicks = true;

        try {

            await navigator.clipboard.writeText(url);

            btn.textContent = "✓ Link Copied";

        } catch {

            window.prompt(
                "Copy this link:",
                url
            );

        }

        setTimeout(() => {

            btn.textContent =
                "🔗 Copy Shareable Link";

        }, 1800);

    }
);


/* =========================================
   DOWNLOAD DESIGN TOKENS
   (turns the client's picks into a real,
   drop-in-able CSS + Tailwind snippet, so
   "we like this direction" becomes something
   a dev can actually build with) -----------
========================================= */

function buildDesignTokensFile() {

    const style =
        styles[selectedStyle];

    const fontStack =
        preview.classList.contains("font-overridden")
            ? preview.style.getPropertyValue("--preview-font").trim()
            : "";

    const fontFamilies =
        fontStack
            ? fontStack
                .split(",")
                .map(f => `"${f.trim().replace(/['"]/g, "")}"`)
                .join(", ")
            : null;

    return (
`/* ==========================================
   DESIGN TOKENS
   Generated from the UI Style Playground
   Style: ${style.name}` +
(clientInfo.client ? `
   Client: ${clientInfo.client}` : "") +
`
========================================== */

:root {
  --color-primary: ${selectedColors.primary};
  --color-secondary: ${selectedColors.secondary};
  --color-background: ${selectedColors.background};` +
(fontStack ? `
  --font-family: ${fontStack};` : `
  /* no custom font was chosen - this style's
     own default typeface applies, see the
     live site for the exact values */`) +
`
}

/* Tailwind (tailwind.config.js -> theme.extend) */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "${selectedColors.primary}",
        secondary: "${selectedColors.secondary}",
        background: "${selectedColors.background}",
      },` +
(fontFamilies ? `
      fontFamily: {
        sans: [${fontFamilies}],
      },` : `
      // font left as this style's default`) +
`
    },
  },
};
`
    );

}

document.getElementById(
    "downloadTokens"
).addEventListener(
    "click",
    () => {

        hasSecuredPicks = true;

        const content =
            buildDesignTokensFile();

        const blob =
            new Blob([content], { type: "text/plain" });

        const url =
            URL.createObjectURL(blob);

        const filename =
            clientInfo.client
                ? `${slugifyDomain(clientInfo.client).replace(".com", "")}-design-tokens.css`
                : "design-tokens.css";

        const link =
            document.createElement("a");

        link.href = url;

        link.download = filename;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    }
);


/* =========================================
   SEND TO AGENCY
   (posts straight to FORM_ENDPOINT when one
   is configured above, so submission doesn't
   depend on the client having a mail app set
   up; otherwise falls back to opening their
   email client. Either way, an on-screen
   status always tells the client what
   happened - they're never left guessing) ---
========================================= */

const submitStatus =
    document.getElementById("submitStatus");

function showSubmitStatus(kind, text) {

    submitStatus.textContent = text;

    submitStatus.className =
        `submit-status status-${kind}`;

    submitStatus.classList.remove("hidden");

}

function hideSubmitStatus() {

    submitStatus.classList.add("hidden");

}

function openMailtoFallback(subject, body) {

    window.location.href =
        `mailto:${SUBMIT_EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

}

document.getElementById(
    "sendSummary"
).addEventListener(
    "click",
    async () => {

        hasSecuredPicks = true;

        const style =
            styles[selectedStyle];

        const subject =
            clientInfo.client
                ? `${clientInfo.client} - UI style selection: ${style.name}`
                : `New UI style selection: ${style.name}`;

        const summaryText =
            buildSummaryText();

        const sendBtn =
            document.getElementById("sendSummary");

        if (!FORM_ENDPOINT) {

            openMailtoFallback(subject, summaryText);

            showSubmitStatus(
                "info",
                "Your email app should now open with everything filled in — just hit send. " +
                `Nothing open? Copy the summary above and email it to ${SUBMIT_EMAIL}.`
            );

            return;

        }

        const originalLabel =
            sendBtn.textContent;

        sendBtn.disabled = true;

        sendBtn.textContent = "Sending…";

        try {

            const response = await fetch(FORM_ENDPOINT, {

                method: "POST",

                headers: { Accept: "application/json" },

                body: new URLSearchParams({
                    subject,
                    client: clientInfo.client,
                    contact: clientInfo.contact,
                    style: style.name,
                    primaryColor: selectedColors.primary,
                    secondaryColor: selectedColors.secondary,
                    background: selectedColors.background,
                    font: currentFontLabel.textContent.trim(),
                    summary: summaryText,
                }),

            });

            if (!response.ok) {

                throw new Error("submission failed");

            }

            showSubmitStatus(
                "success",
                "✓ Sent! We've received your selection and will be in touch shortly."
            );

        } catch {

            openMailtoFallback(subject, summaryText);

            showSubmitStatus(
                "error",
                "Couldn't submit that automatically, so your email app should now open instead — " +
                `please hit send there, or email us directly at ${SUBMIT_EMAIL}.`
            );

        } finally {

            sendBtn.disabled = false;

            sendBtn.textContent = originalLabel;

        }

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealTargets = document.querySelectorAll(
    ".style-information, .preview-frame, .explanation, .decision-panel"
);

revealTargets.forEach(
    el => el.classList.add("reveal")
);

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("in-view");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    { threshold: 0.12 }
);

revealTargets.forEach(
    el => revealObserver.observe(el)
);


/* =========================================
   INTRO STAT COUNT-UP
========================================= */

const countTargets = document.querySelectorAll(
    ".intro-stat strong[data-count]"
);

const countObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCount(entry.target, 1200);

                countObserver.unobserve(entry.target);

            }

        });

    },
    { threshold: 0.4 }
);

countTargets.forEach(
    el => countObserver.observe(el)
);


/* =========================================
   CURSOR SPOTLIGHT
========================================= */

window.addEventListener(
    "mousemove",
    event => {

        document.documentElement.style.setProperty(
            "--mx",
            `${event.clientX}px`
        );

        document.documentElement.style.setProperty(
            "--my",
            `${event.clientY}px`
        );

    },
    { passive: true }
);


/* =========================================
   FLOATING CARD TILT
========================================= */

document.querySelectorAll(".floating-card").forEach(
    card => {

        card.addEventListener("mouseenter", () => {

            card.style.animationPlayState = "paused";

        });

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const px = (event.clientX - rect.left) / rect.width - 0.5;

            const py = (event.clientY - rect.top) / rect.height - 0.5;

            card.style.transform =
                `perspective(700px) rotateX(${(-py * 14).toFixed(2)}deg) rotateY(${(px * 14).toFixed(2)}deg) scale(1.04)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

            card.style.animationPlayState = "running";

        });

    }
);


/* =========================================
   PAGE LOAD-IN SEQUENCE
========================================= */

requestAnimationFrame(() => {

    requestAnimationFrame(() => {

        document.body.classList.add("loaded");

    });

});


/* =========================================
   REPOSITION PILL ON RESIZE
========================================= */

window.addEventListener(
    "resize",
    () => movePill(),
    { passive: true }
);


/* =========================================
   PAGE BUILDER
   (drag elements from the palette into
   the live preview, reorder, remove)
========================================= */

const previewContent =
    document.querySelector(".preview-content");

const dropZone =
    document.getElementById("dropZone");

let blockCounter = 0;

const blockLabels = {

    testimonial: "Testimonial",
    stats: "Stats row",
    pricing: "Pricing",
    cta: "CTA banner",
    faq: "FAQ"

};

const blockTemplates = {

    testimonial: () => `
        <div class="preview-card testimonial-inner">
            <span class="card-icon">"</span>
            <p class="testimonial-quote">
                "This completely changed how our team ships
                product. Fast, intuitive and genuinely
                beautiful to use every day."
            </p>
            <div class="testimonial-person">
                <span class="avatar-dot"></span>
                <div>
                    <strong>Amara Chen</strong>
                    <span>Head of Product, Nova Labs</span>
                </div>
            </div>
        </div>
    `,

    stats: () => `
        <div class="stats-row">
            <div class="preview-card stat-card">
                <strong>12,400+</strong>
                <span>Active users</span>
            </div>
            <div class="preview-card stat-card">
                <strong>98%</strong>
                <span>Customer satisfaction</span>
            </div>
            <div class="preview-card stat-card">
                <strong>4.9 / 5</strong>
                <span>Average rating</span>
            </div>
        </div>
    `,

    pricing: () => `
        <div class="pricing-grid">
            <div class="preview-card pricing-card">
                <span class="mini-label">STARTER</span>
                <strong class="price">₹0</strong>
                <p>For individuals getting started.</p>
                <button class="preview-secondary">Choose plan</button>
            </div>
            <div class="preview-card pricing-card featured">
                <span class="mini-label">PRO</span>
                <strong class="price">₹999<span>/mo</span></strong>
                <p>For growing teams and products.</p>
                <button class="preview-button">Choose plan</button>
            </div>
            <div class="preview-card pricing-card">
                <span class="mini-label">ENTERPRISE</span>
                <strong class="price">Custom</strong>
                <p>For large scale organizations.</p>
                <button class="preview-secondary">Contact us</button>
            </div>
        </div>
    `,

    cta: () => `
        <div class="cta-banner">
            <div>
                <span class="mini-label">READY WHEN YOU ARE</span>
                <h3>Let's build your next product together.</h3>
            </div>
            <button class="preview-button">Get Started Free</button>
        </div>
    `,

    faq: () => `
        <div class="preview-card faq-inner">
            <h3>Frequently asked questions</h3>
            <details class="faq-item" open>
                <summary>How long does setup take?</summary>
                <p>Most teams are up and running in under 10 minutes.</p>
            </details>
            <details class="faq-item">
                <summary>Can I change my plan later?</summary>
                <p>Yes, you can upgrade or downgrade anytime, with no penalties.</p>
            </details>
            <details class="faq-item">
                <summary>Do you offer support?</summary>
                <p>We provide 24/7 priority support across all plans.</p>
            </details>
        </div>
    `

};


function createBlock(key) {

    blockCounter += 1;

    const id = `block-${blockCounter}`;

    const wrapper = document.createElement("div");

    wrapper.className = "added-block";

    wrapper.id = id;

    wrapper.dataset.blockKey = key;

    wrapper.draggable = true;

    wrapper.innerHTML = `
        <div class="block-toolbar">
            <span class="block-drag-handle" title="Drag to reorder">⠿</span>
            <span class="block-label">${blockLabels[key]}</span>
            <button class="block-remove" title="Remove this block" type="button">×</button>
        </div>
        ${blockTemplates[key]()}
    `;

    wrapper.querySelector(".block-remove")
        .addEventListener("click", () => {

            wrapper.remove();

            saveStateToStorage();

        });

    wrapper.addEventListener("dragstart", event => {

        wrapper.classList.add("dragging");

        event.dataTransfer.setData(
            "text/plain",
            `move:${id}`
        );

        event.dataTransfer.effectAllowed = "move";

    });

    wrapper.addEventListener("dragend", () => {

        wrapper.classList.remove("dragging");

        saveStateToStorage();

    });

    return wrapper;

}


/* adding a block to the preview: shared by
   both the drag-and-drop path (desktop) and
   a plain click (works everywhere, including
   touch devices where HTML5 drag doesn't) */

function addElementBlock(key) {

    if (!blockTemplates[key]) {

        return;

    }

    const block =
        createBlock(key);

    previewContent.insertBefore(
        block,
        dropZone
    );

    saveStateToStorage();

}

document.querySelectorAll(".element-chip").forEach(chip => {

    chip.addEventListener("dragstart", event => {

        event.dataTransfer.setData(
            "text/plain",
            `new:${chip.dataset.block}`
        );

        event.dataTransfer.effectAllowed = "copy";

    });

    chip.addEventListener("click", () => {

        addElementBlock(chip.dataset.block);

    });

});


previewContent.addEventListener("dragover", event => {

    event.preventDefault();

    const dragging =
        previewContent.querySelector(".added-block.dragging");

    if (dragging) {

        const blocks = [
            ...previewContent.querySelectorAll(
                ".added-block:not(.dragging)"
            )
        ];

        const next = blocks.find(block => {

            const rect = block.getBoundingClientRect();

            return event.clientY <= rect.top + rect.height / 2;

        });

        if (next) {

            previewContent.insertBefore(dragging, next);

        } else {

            previewContent.insertBefore(dragging, dropZone);

        }

    }

    dropZone.classList.add("drag-over");

});


previewContent.addEventListener("dragleave", event => {

    if (!previewContent.contains(event.relatedTarget)) {

        dropZone.classList.remove("drag-over");

    }

});


previewContent.addEventListener("drop", event => {

    event.preventDefault();

    dropZone.classList.remove("drag-over");

    const data =
        event.dataTransfer.getData("text/plain");

    if (data.startsWith("new:")) {

        addElementBlock(data.slice(4));

    }

});


/* =========================================
   TEXT COLOR TOOLBAR
   (select text inside the live preview,
   then pick a color to apply to it)
========================================= */

const textColorToolbar =
    document.getElementById("textColorToolbar");

const tctCustomColor =
    document.getElementById("tctCustomColor");

const tctClear =
    document.getElementById("tctClear");

let lastRange = null;


function getSelectionRange() {

    const sel = window.getSelection();

    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {

        return null;

    }

    if (!sel.toString().trim()) {

        return null;

    }

    const range = sel.getRangeAt(0);

    if (!preview.contains(range.commonAncestorContainer)) {

        return null;

    }

    return range;

}


function positionToolbar(range) {

    const rect = range.getBoundingClientRect();

    const toolbarRect =
        textColorToolbar.getBoundingClientRect();

    let top = rect.top - toolbarRect.height - 12;

    if (top < 8) {

        top = rect.bottom + 12;

    }

    const left = Math.min(
        Math.max(rect.left + rect.width / 2, 90),
        window.innerWidth - 90
    );

    textColorToolbar.style.top = `${top}px`;

    textColorToolbar.style.left = `${left}px`;

}


function showToolbarForSelection() {

    const range = getSelectionRange();

    if (!range) {

        textColorToolbar.classList.add("hidden");

        return;

    }

    lastRange = range.cloneRange();

    textColorToolbar.classList.remove("hidden");

    positionToolbar(range);

}


document.addEventListener("mouseup", event => {

    if (textColorToolbar.contains(event.target)) {

        return;

    }

    setTimeout(showToolbarForSelection, 0);

});


document.addEventListener("keyup", event => {

    if (event.shiftKey) {

        showToolbarForSelection();

    }

});


window.addEventListener(
    "scroll",
    () => textColorToolbar.classList.add("hidden"),
    { passive: true }
);


document.addEventListener("mousedown", event => {

    if (
        !textColorToolbar.contains(event.target) &&
        !preview.contains(event.target)
    ) {

        textColorToolbar.classList.add("hidden");

    }

});


function applyColorToSelection(color) {

    if (!lastRange) {

        return;

    }

    const span = document.createElement("span");

    span.className = "user-text-color";

    span.style.color = color;

    const frag = lastRange.extractContents();

    span.appendChild(frag);

    lastRange.insertNode(span);

    window.getSelection().removeAllRanges();

    textColorToolbar.classList.add("hidden");

    lastRange = null;

}


document.querySelectorAll(".tct-swatch").forEach(swatch => {

    swatch.addEventListener("click", () => {

        applyColorToSelection(swatch.dataset.color);

    });

});


tctCustomColor.addEventListener("input", () => {

    applyColorToSelection(tctCustomColor.value);

});


tctClear.addEventListener("click", () => {

    applyColorToSelection("inherit");

});


/* =========================================
   COMPARE STYLES MODAL
========================================= */

const compareModal =
    document.getElementById("compareModal");

const compareSelectA =
    document.getElementById("compareSelectA");

const compareSelectB =
    document.getElementById("compareSelectB");

const compareFrameA =
    document.getElementById("compareFrameA");

const compareFrameB =
    document.getElementById("compareFrameB");


function renderComparePreviewHTML(key) {

    const style = styles[key];

    return `
        <div class="compare-card preview ${key}">

            <nav class="preview-navbar">
                <div class="preview-logo">${escapeHtml(clientInfo.client || "Acme")}</div>
                <button class="preview-button">Get Started</button>
            </nav>

            <div class="compare-card-body preview-hero">

                <div class="hero-copy">

                    <span class="preview-badge">NEW EXPERIENCE</span>

                    <h2>Build something people love.</h2>

                    <p>A live example of the ${style.name} style with your brand colors.</p>

                    <div class="hero-actions">
                        <button class="preview-button">Primary</button>
                        <button class="preview-secondary">Secondary</button>
                    </div>

                </div>

                <div class="compare-card-cards">

                    <div class="preview-card">
                        <span class="card-icon">◈</span>
                        <h3>Simple</h3>
                        <p>Clear visual hierarchy.</p>
                    </div>

                    <div class="preview-card">
                        <span class="card-icon">✦</span>
                        <h3>Modern</h3>
                        <p>Contemporary components.</p>
                    </div>

                </div>

            </div>

        </div>
    `;

}


function populateCompareSelects() {

    const options = Object.entries(styles)
        .map(([key, style]) => `<option value="${key}">${style.name}</option>`)
        .join("");

    compareSelectA.innerHTML = options;

    compareSelectB.innerHTML = options;

}


function pickDefaultCompareStyles() {

    const keys = Object.keys(styles);

    compareSelectA.value = selectedStyle;

    const otherKey =
        keys.find(key => key !== selectedStyle) || keys[0];

    compareSelectB.value = otherKey;

}


function renderCompareFrame(slot) {

    if (slot === "A") {

        compareFrameA.innerHTML =
            renderComparePreviewHTML(compareSelectA.value);

    } else {

        compareFrameB.innerHTML =
            renderComparePreviewHTML(compareSelectB.value);

    }

}


function openCompareModal() {

    populateCompareSelects();

    pickDefaultCompareStyles();

    renderCompareFrame("A");

    renderCompareFrame("B");

    compareModal.classList.remove("hidden");

}


document.getElementById("compareBtn")
    .addEventListener("click", openCompareModal);


document.getElementById("closeCompareModal")
    .addEventListener("click", () => {

        compareModal.classList.add("hidden");

    });


compareModal.addEventListener("click", event => {

    if (event.target === compareModal) {

        compareModal.classList.add("hidden");

    }

});


compareSelectA.addEventListener(
    "change",
    () => renderCompareFrame("A")
);


compareSelectB.addEventListener(
    "change",
    () => renderCompareFrame("B")
);


document.querySelectorAll(".compare-pick").forEach(button => {

    button.addEventListener("click", () => {

        const slot = button.dataset.slot;

        const key =
            slot === "A"
                ? compareSelectA.value
                : compareSelectB.value;

        selectStyle(key);

        compareModal.classList.add("hidden");

        document.querySelector(".preview-frame")
            .scrollIntoView({ behavior: "smooth", block: "start" });

    });

});


/* =========================================
   FONT DRAG & DROP
========================================= */

const previewFrameEl =
    document.querySelector(".preview-frame");

const currentFontLabel =
    document.getElementById("currentFontLabel");

/* applying a font to the preview: shared by
   drag-and-drop (desktop) and a plain click
   (works everywhere, including touch devices
   where HTML5 drag doesn't) */

function applyFont(fontStack) {

    preview.style.setProperty(
        "--preview-font",
        fontStack
    );

    preview.classList.add("font-overridden");

    currentFontLabel.textContent =
        fontStack.split(",")[0].replace(/['"]/g, "");

    saveStateToStorage();

}

document.querySelectorAll(".font-chip").forEach(chip => {

    chip.addEventListener("dragstart", event => {

        event.dataTransfer.setData(
            "text/plain",
            `font:${chip.dataset.font}`
        );

        event.dataTransfer.effectAllowed = "copy";

    });

    chip.addEventListener("click", () => {

        applyFont(chip.dataset.font);

    });

});


previewFrameEl.addEventListener("dragover", event => {

    event.preventDefault();

    previewFrameEl.classList.add("font-drag-over");

});


previewFrameEl.addEventListener("dragleave", event => {

    if (!previewFrameEl.contains(event.relatedTarget)) {

        previewFrameEl.classList.remove("font-drag-over");

    }

});


previewFrameEl.addEventListener("drop", event => {

    previewFrameEl.classList.remove("font-drag-over");

    const data =
        event.dataTransfer.getData("text/plain");

    if (!data.startsWith("font:")) {

        return;

    }

    event.preventDefault();

    applyFont(data.slice(5));

});


document.getElementById("resetFont")
    .addEventListener("click", () => {

        preview.classList.remove("font-overridden");

        preview.style.removeProperty("--preview-font");

        currentFontLabel.textContent =
            "this style's default font";

        saveStateToStorage();

    });


/* =========================================
   INITIALIZE
========================================= */

renderStyleList();

selectStyle(
    selectedStyle
);

updateColors();

applyClientPersonalization();

applyStyleImages();

setupOptionalExtras();

restoreSharedState();

maybeShowResumeBanner();

initComplete = true;