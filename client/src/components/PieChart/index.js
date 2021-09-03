import "./styles.css";
import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";



export default function PieGraph(props) {
  return (    

    <div>
      <div>
      <PieChart width={1000} height={400}>
        <Pie
          dataKey="qty"
          data={props.data}
          cx={800}
          cy={200}
          innerRadius={100}
          outerRadius={150}
          fill="#82ca9d"
          label
        />
        <Pie

          dataKey="price"
          data={props.data}
          cx={800}
          cy={200}
          innerRadius={60}
          outerRadius={70}
          fill="#FF0000"
        />
        <Tooltip />
      </PieChart>
      </div>
      
      
    </div>
  );
}