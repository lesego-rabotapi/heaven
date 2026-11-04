export function Truths() {
  return (
    <section className="truths-section flex flex-col lg:grid lg:grid-cols-3" style={{ background: "#EEF4FA" }}>
      <div className="flex flex-col" style={{ gap: "14px" }}>
        <div className="tile truths-tile" style={{ overflow: "hidden" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" srcSet="images/interior-signage.webp" />
            <img src="images/interior-signage.jpg" alt="The heaven coffee sign board inside the church" width="1280" height="853" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="flex items-baseline justify-between pt-2.5" style={{ borderTop: "1px solid #0F1B2D" }}>
          <h2 className="truths-h2 font-display uppercase m-0" style={{ fontStretch: "75%", fontWeight: "800", letterSpacing: "-0.01em" }}>
            Sacred
          </h2>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "#3E4C63" }}>
            01
          </span>
        </div>
        <p className="m-0" style={{ fontSize: "15px", lineHeight: "1.6", color: "#3E4C63", maxWidth: "360px" }}>
          Coffee under the Gothic arches of Central Methodist Mission, one of the city's most recognisable facades.
        </p>
      </div>
      <div className="flex flex-col lg:mt-[70px]" style={{ gap: "14px" }}>
        <div className="tile truths-tile" style={{ overflow: "hidden" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" srcSet="images/dog-petting-outdoor.webp" />
            <img src="images/dog-petting-outdoor.jpg" alt="Customers petting a dog at the outdoor tables" width="657" height="873" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="flex items-baseline justify-between pt-2.5" style={{ borderTop: "1px solid #0F1B2D" }}>
          <h2 className="truths-h2 font-display uppercase m-0" style={{ fontStretch: "75%", fontWeight: "800", letterSpacing: "-0.01em" }}>
            Open door
          </h2>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "#3E4C63" }}>
            02
          </span>
        </div>
        <p className="m-0" style={{ fontSize: "15px", lineHeight: "1.6", color: "#3E4C63", maxWidth: "360px" }}>
          Locals on the commute, visitors off the square. Everyone who finds the door is welcome.
        </p>
      </div>
      <div className="flex flex-col lg:mt-[140px]" style={{ gap: "14px" }}>
        <div className="tile truths-tile" style={{ overflow: "hidden" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" srcSet="images/tourist-pastry-umbrella.webp" />
            <img src="images/tourist-pastry-umbrella.jpg" alt="A visitor with a pastry under a navy umbrella on Greenmarket Square" width="697" height="875" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="flex items-baseline justify-between pt-2.5" style={{ borderTop: "1px solid #0F1B2D" }}>
          <h2 className="truths-h2 font-display uppercase m-0" style={{ fontStretch: "75%", fontWeight: "800", letterSpacing: "-0.01em" }}>
            On the square
          </h2>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "#3E4C63" }}>
            03
          </span>
        </div>
        <p className="m-0" style={{ fontSize: "15px", lineHeight: "1.6", color: "#3E4C63", maxWidth: "360px" }}>
          Navy umbrellas on the corner of Burg and Longmarket, a step off the Greenmarket Square market.
        </p>
      </div>
    </section>
  );
}
