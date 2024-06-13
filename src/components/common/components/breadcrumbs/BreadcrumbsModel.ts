export interface RouteParams extends Record<string, string | undefined> {
  folder?: string;
  subFolder?: string;
  tab?: string;
  subTab?: string;
}
