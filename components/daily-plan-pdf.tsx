import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Task } from "@/app/dashboard/tasks/tasks-table";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
  },
  taskRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderBottomStyle: "solid",
    paddingVertical: 8,
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 14,
    flexGrow: 1,
  },
  taskMeta: {
    fontSize: 10,
    color: "#888",
    width: 100,
    textAlign: "right",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    marginBottom: 20,
    paddingBottom: 10,
  },
});

export const DailyPlanPDF = ({ tasks }: { tasks: Task[] }) => {
  const activeTasks = tasks.filter((t) => t.status !== "done");
  const completedTasks = tasks.filter((t) => t.status === "done");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Nucleus Daily Plan</Text>
          <Text style={styles.date}>{format(new Date(), "PPPP")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>To Do</Text>
          {activeTasks.map((task) => (
            <View key={task.id} style={styles.taskRow}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskMeta}>
                {task.estimatedMinutes ? `${task.estimatedMinutes}m` : ""} | P: {task.priorityScore}
              </Text>
            </View>
          ))}
          {activeTasks.length === 0 && (
             <Text style={{ fontSize: 12, color: "#888" }}>No active tasks.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 20 }}>Completed</Text>
          {completedTasks.map((task) => (
            <View key={task.id} style={styles.taskRow}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskMeta}>Done</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

