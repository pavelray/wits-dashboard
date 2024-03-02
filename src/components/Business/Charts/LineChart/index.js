"use client";
import { Fragment, useEffect } from "react";
import { Chart } from "chart.js/auto";
import Title from "@/components/UI/Heading/Title";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";

function LineChart({
  labels,
  datasets,
  name = "Line Chart",
  id = "myChart",
}) {
  console.log(datasets);
  console.log(labels);
  useEffect(() => {
    const ctx = document.getElementById(id).getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              // time: {
              //   unit: "day",
              //   displayFormats: {
              //     millisecond: "MMM DD",
              //     second: "MMM DD",
              //     minute: "MMM DD",
              //     hour: "MMM DD",
              //     day: "MMM DD",
              //     week: "MMM DD",
              //     month: "MMM DD",
              //     quarter: "MMM DD",
              //     year: "MMM DD",
              //   },
              // },
              title: {
                display: true,
                text: "Date",
              },
            },
          ],
          yAxes: [
            {
              title: {
                display: true,
                text: "value",
              },
            },
          ],
        },
        adapters: {
          date: {
            locale: enUS,
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
        <div className="border border-gray-400 pt-0 w-full h-fit my-auto">
          <canvas id={id}></canvas>
        </div>
      </div>
    </Fragment>
  );
}

export default LineChart;
