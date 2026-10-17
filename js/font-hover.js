// Typeface-card hover: cycle a random look every 1s while hovered. Opt in per
// card on the .type-grid__card, plus --typeface-font (see typefaces-index.html):
//   - data-style-pairs (comma-separated "weight:style" pairs) for typefaces
//     that toggle between two specific weight+style combos, e.g. Actosk's
//     "400:normal,700:italic" (regular to bold italic).
//   - data-families (comma-separated font-family names) for typefaces that
//     vary by family instead, e.g. Sinfonie's title/caption optical sizes.
// A card can use either — no changes needed here for a new typeface.
// Touch devices have no real hover state to trigger this on, so instead of
// waiting for mouseenter/mouseleave, every card just auto-plays continuously —
// but running non-stop at the same pace as the hover version feels frantic,
// so mobile runs at half speed (double the timings).
const isTouch = window.matchMedia("(hover: none)").matches;
const CYCLE_MS = isTouch ? 1000 : 500;

document
  .querySelectorAll(".type-grid__card[data-style-pairs], .type-grid__card[data-families]")
  .forEach((card) => {
    const name = card.querySelector(".type-grid__name");
    if (!name) return;

    const stylePairs = card.dataset.stylePairs
      ? card.dataset.stylePairs.split(",").map((pair) => {
          const [weight, style] = pair.split(":").map((s) => s.trim());
          return { weight, style: style || "normal" };
        })
      : null;
    const families = card.dataset.families
      ? card.dataset.families.split(",").map((f) => f.trim())
      : null;
    const options = stylePairs || families;

    let cycleInterval = null;
    let lastOption = null;

    function pickStyle() {
      let option;
      do {
        option = options[Math.floor(Math.random() * options.length)];
      } while (options.length > 1 && option === lastOption);
      lastOption = option;

      if (stylePairs) {
        name.style.fontWeight = option.weight;
        name.style.fontStyle = option.style;
      } else {
        name.style.fontFamily = option;
      }
    }

    if (isTouch) {
      pickStyle();
      cycleInterval = setInterval(pickStyle, CYCLE_MS);
      return;
    }

    card.addEventListener("mouseenter", () => {
      pickStyle();
      cycleInterval = setInterval(pickStyle, CYCLE_MS);
    });

    card.addEventListener("mouseleave", () => {
      clearInterval(cycleInterval);
      cycleInterval = null;
      lastOption = null;
      name.style.fontWeight = "";
      name.style.fontStyle = "";
      name.style.fontFamily = "";
    });
  });

// Typeface list rows: align .type-grid__meta to .type-grid__name's real
// rendered baseline. CSS's align-items: baseline is unreliable here since
// each custom webfont bakes in its own (often inconsistent) ascent/descent
// metrics — instead, a zero-size marker with vertical-align: baseline gets
// the browser to report the exact baseline Y for any given line of text,
// which we then diff and apply as a translateY nudge on the meta line.
function getBaselineY(el) {
  const marker = document.createElement("span");
  marker.style.cssText = "display: inline-block; width: 0; height: 0; vertical-align: baseline;";
  el.appendChild(marker);
  const y = marker.getBoundingClientRect().top;
  marker.remove();
  return y;
}

const nameMetaSameRow = window.matchMedia("(min-width: 769px)");

function alignMetaToNameBaseline() {
  document.querySelectorAll(".type-grid__card").forEach((card) => {
    const name = card.querySelector(".type-grid__name");
    const meta = card.querySelector(".type-grid__meta");
    if (!name || !meta) return;
    // Below 768px (see typefaces-index.css) name/meta stack in separate
    // rows instead of sharing one — nothing to baseline-match there.
    if (!nameMetaSameRow.matches) {
      meta.style.transform = "";
      return;
    }
    meta.style.transform = "";
    const delta = getBaselineY(name) - getBaselineY(meta);
    meta.style.transform = `translateY(${delta}px)`;
  });
}

if (document.querySelector(".type-grid__card")) {
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(alignMetaToNameBaseline);
  window.addEventListener("resize", alignMetaToNameBaseline);
}
