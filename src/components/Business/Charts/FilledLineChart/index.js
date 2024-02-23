"use client";
import { Fragment, useEffect } from "react";
import { Chart } from "chart.js/auto";

function FilledLineChart({ labels, datasets, name = "Bar Chart" }) {
  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: datasets,
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [datasets, labels]);

  return (
    <Fragment>
      <h1 className="mx-auto mt-10 text-xl font-semibold capitalize ">
        {name}
      </h1>
      <div className="w-full h-full flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 w-full h-fit my-auto">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </Fragment>
  );
}

export default FilledLineChart;
