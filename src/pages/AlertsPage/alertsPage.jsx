import { AlertsData } from "../../data/alertsData";
import "./alertsPageStyle.css";


const AlertsPage = () => {
  return (
    <section>
      <h1>Alerts</h1>
      {AlertsData.map(alert => (
        <div className="notification-card" key={alert.id}>
          <h2>{alert.title}</h2>
          <p>{alert.message}</p>
          <p className="datetime">{alert.datetime}</p>
        </div>
      ))}
    </section>
  );
};

export default AlertsPage;
