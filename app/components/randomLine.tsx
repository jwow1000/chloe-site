"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";



export default function RandomLine() {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const lineGenerator = d3.line();
    const points:[number, number][] = Array.from({ length: 12 }, () => [
      Math.random() * 100,
      Math.random() * 100,
    ]);

    svg
      .append("path")
      .attr("d", lineGenerator(points) || "" )
      .attr("fill", "none")
      .attr("stroke", "pink")
      .attr("stroke-width", 1);
  }, []);

  return <svg ref={ref} width={100} height={100}></svg>;
}
