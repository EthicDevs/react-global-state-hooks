// lib
import type { DispatchLogger, Logger, StateLogger } from "../types";
import { LoggerType } from "../types";

export function getConsoleLogger(loggerType: LoggerType): Logger {
  switch (loggerType) {
    case LoggerType.Dispatch: {
      return {
        logAction({ type: t, payload, metas }) {
          console.log(
            `[dispatch] ${String(t)} => payload:`,
            payload,
            "metas?:",
            metas,
          );
        },
      } as DispatchLogger;
    }
    case LoggerType.State: {
      return {
        logState(state) {
          console.log(`[state] =>`, state);
        },
      } as StateLogger;
    }
  }
}
