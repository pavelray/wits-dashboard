"use client";
import { Fragment, useEffect } from "react";
import { Chart } from "chart.js/auto";
import Title from "@/components/UI/Heading/Title";
import "chartjs-adapter-date-fns";
import { enIN, enUS } from "date-fns/locale";

function HorizontalBarChart({
  labels,
  datasets,
  name = "Bar Chart",
  id = "myChart",
}) {
    console.log(labels);
  useEffect(() => {
    const ctx = document.getElementById(id).getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
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
        <div className="border border-gray-400 pt-0 w-full h-fit my-auto overflow-x-auto">
          <canvas id={id}></canvas>
        </div>
      </div>
    </Fragment>
  );
}

export default HorizontalBarChart;
