import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Title from "./Title";
import i18n, { t } from "../../i18n";

export default function Chart(props) {
  const theme = useTheme();
  const [events, setEvents] = useState([]);

  const loadData = () => {
    const { appointments } = props;
    let finalResult = [];
    if (appointments && appointments.length) {
      let results = _.groupBy(appointments, (appointment) => appointment.GPId);
      for (const res of Object.values(results)) {
        finalResult.push({
          name: res[0].GP.username,
          GP: res.length,
        });
      }
      finalResult = _.sortBy(finalResult, (gp) => gp.name);
    }
    setEvents(finalResult);
  };

  useEffect(() => {
    loadData();
  }, [props.appointments]);

  return (
    <React.Fragment>
      <Title>{t("dashboard_chartTitle_appointments")}</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={events}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              {t("dashboard_y_Title_appointments")}
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="GP" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
