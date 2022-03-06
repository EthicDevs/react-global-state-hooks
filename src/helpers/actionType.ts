// A factory function to make an action type ($prefix/$name)
export function actionType(
  name: string,
  prefix = "core",
  joiner = "/"
): string {
  return [prefix, name].join(joiner) as string;
}
