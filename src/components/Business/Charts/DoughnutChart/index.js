"use client";
import { Fragment, useEffect } from "react";
import { Chart } from "chart.js/auto";
import Title from "@/components/UI/Heading/Title";

function DoughnutChart({
  labels,
  datasets,
  name = "Doughnut Chart",
  id = "myChart",
}) {
  useEffect(() => {
    const ctx = document.getElementById(id).getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          }
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [datasets, id, labels]);

  return (
    <Fragment>
      <Title text={name} />
      <div className="w-full h-full flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 w-full h-fit my-auto">
          <canvas id={id}></canvas>
        </div>
      </div>
    </Fragment>
  );
}

export default DoughnutChart;
