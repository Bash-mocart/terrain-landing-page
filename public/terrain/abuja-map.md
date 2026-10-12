abuja-map.svg: a real map of central Abuja (lon 7.356–7.644, lat 8.98–9.16) in brand colours:
ink roads, green terrain, sage water. Built only from open data:
- Terrain: AWS Terrain Tiles (terrarium, z12; SRTM-derived elevation), lightly smoothed,
  20 m contours traced with d3-contour; heavier 100 m index lines; land above 520 m tinted;
  the highest point (Aso Rock, 925 m in this data) marked.
- Roads and water: OpenStreetMap via the Overpass API (highways motorway to tertiary plus
  residential/unclassified streets; natural=water and reservoirs), simplified.
  © OpenStreetMap contributors, ODbL. The credit is in the SVG and on the gate page.
Major roads draw in outward from the Central Business District, streets fade in ring by
ring, lakes fade in. All animation is CSS inside the SVG and is off for reduced motion.
Generator: scratch scripts open.mjs + map.mjs (not committed); regenerate if the area changes.
