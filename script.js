/* =========================================
   CONFIG
========================================= */

/* where a client's finished selection gets
   emailed when they hit "Send to Agency" -
   change this to whichever inbox should
   receive submissions */
const SUBMIT_EMAIL = "bhushan@impacgo.com";


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
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l7 4v10l-7 4-7-4V7z"/><circle cx="12" cy="12" r="2"/></svg>`

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

        characteristics: [
            "Dark backgrounds",
            "Glowing accents",
            "Sharp geometry",
            "Technology aesthetic"
        ]

    }

};


/* =========================================
   STATE
========================================= */

let selectedStyle = "minimalism";

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

}


/* =========================================
   VALID HEX
========================================= */

function validHex(value) {

    return /^#[0-9A-F]{6}$/i.test(value);

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


function openSummaryModal() {

    createSummary();

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
   SEND TO AGENCY
   (opens the visitor's email client with
   the full selection pre-filled - works
   with zero backend; swap the body of this
   handler for a fetch() to a form endpoint
   later if you want it to submit silently)
========================================= */

document.getElementById(
    "sendSummary"
).addEventListener(
    "click",
    () => {

        const style =
            styles[selectedStyle];

        const subject =
            clientInfo.client
                ? `${clientInfo.client} - UI style selection: ${style.name}`
                : `New UI style selection: ${style.name}`;

        const mailtoUrl =
            `mailto:${SUBMIT_EMAIL}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(buildSummaryText())}`;

        window.location.href = mailtoUrl;

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

    });

    return wrapper;

}


document.querySelectorAll(".element-chip").forEach(chip => {

    chip.addEventListener("dragstart", event => {

        event.dataTransfer.setData(
            "text/plain",
            `new:${chip.dataset.block}`
        );

        event.dataTransfer.effectAllowed = "copy";

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

        const key = data.slice(4);

        if (blockTemplates[key]) {

            const block = createBlock(key);

            previewContent.insertBefore(block, dropZone);

        }

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

document.querySelectorAll(".font-chip").forEach(chip => {

    chip.addEventListener("dragstart", event => {

        event.dataTransfer.setData(
            "text/plain",
            `font:${chip.dataset.font}`
        );

        event.dataTransfer.effectAllowed = "copy";

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

    const fontStack = data.slice(5);

    preview.style.setProperty("--preview-font", fontStack);

    preview.classList.add("font-overridden");

    currentFontLabel.textContent =
        fontStack.split(",")[0].replace(/['"]/g, "");

});


document.getElementById("resetFont")
    .addEventListener("click", () => {

        preview.classList.remove("font-overridden");

        preview.style.removeProperty("--preview-font");

        currentFontLabel.textContent =
            "this style's default font";

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