export class GroupByValueConverter {

  public toView<TItem>(array: TItem[], property: keyof TItem) {
    const groups = new Map<TItem[keyof TItem], Group<TItem>>();
    for (const item of array) {
      const key = item[property];
      let group = groups.get(key);
      if (!group) {
        group = { key, items: [] };
        groups.set(key, group);
      }
      group.items.push(item);
    }
    return Array.from(groups.values());
  }
}

export interface Group<TItem> {
  readonly key: TItem[keyof TItem];
  readonly items: TItem[];
}
