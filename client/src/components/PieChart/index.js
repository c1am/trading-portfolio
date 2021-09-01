import "./styles.css";
import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";



export default function Chart(props) {
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        data={props.data}
        cx={800}
        cy={200}
        innerRadius={100}
        outerRadius={150}
        fill="#82ca9d"
      />
      <Tooltip />
    </PieChart>
  );
}