
import { Component } from "react";

class AuditLogger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      notification: ""
    };

    this.timer = null;
  }

  componentDidMount() {
    const savedLogs = localStorage.getItem("inventoryLogs");

    if (savedLogs) {
      try {
        const logs = JSON.parse(savedLogs);

        if (Array.isArray(logs)) {
          this.setState({ logs });
        }
      } catch {
        localStorage.removeItem("inventoryLogs");
      }
    }
  }

  addLog(message) {
    const newLog = {
      id: Date.now() + Math.random(),
      message,
      time: new Date().toLocaleString()
    };

    this.setState((prev) => ({
      logs: [newLog, ...prev.logs].slice(0, 20),
      notification: message
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.logs !== this.state.logs) {
      localStorage.setItem(
        "inventoryLogs",
        JSON.stringify(this.state.logs)
      );
    }

    if (prevState.notification !== this.state.notification) {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.setState({ notification: "" });
      }, 2500);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div className="audit-section">
        {this.state.notification && (
          <div className="toast">
            ✓ {this.state.notification}
          </div>
        )}

        <h3>Recent Activity</h3>

        {this.state.logs.length === 0 ? (
          <p className="muted">No activity recorded yet.</p>
        ) : (
          this.state.logs.map((log) => (
            <div className="log-item" key={log.id}>
              <span>{log.message}</span>
              <small>{log.time}</small>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default AuditLogger;
