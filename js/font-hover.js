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
