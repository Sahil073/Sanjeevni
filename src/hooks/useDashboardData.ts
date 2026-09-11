import { useState, useCallback, useEffect } from "react";
import { DashboardData } from "@/types/dashboard";
import { initialDashboardData } from "@/data/mockDashboardData";

/**
 * useDashboardData hook
 * 
 * Provides reactive dashboard health data.
 * Architecture Note: Designed for drop-in SQLite integration.
 * In SQLite mode, `loadData()` will query:
 *   `SELECT * FROM vitals_log ORDER BY timestamp DESC LIMIT 1;`
 *   and time-series data for sparkline histories:
 *   `SELECT timestamp, heart_rate FROM vitals_log ORDER BY timestamp DESC LIMIT 10;`
 */
export function useDashboardData() {
  const [data, setData] = useState<DashboardData>(initialDashboardData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Future SQLite integration point:
      // const db = await SQLite.openDatabaseAsync("sanjeevni.db");
      // const latest = await db.getFirstAsync<VitalsSqliteRow>("SELECT ... FROM vitals_log");
      // setData(mapSqliteToDashboard(latest));
      setData(initialDashboardData);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      // Future SQLite integration point:
      // const db = await SQLite.openDatabaseAsync("sanjeevni.db");
      // const latest = await db.getFirstAsync<VitalsSqliteRow>("SELECT ... FROM vitals_log");
      // if (isMounted && latest) setData(mapSqliteToDashboard(latest));
      if (isMounted) {
        setData(initialDashboardData);
      }
    }

    void loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data,
    isLoading,
    refreshData,
  };
}
