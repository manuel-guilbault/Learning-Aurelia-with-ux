export class FilterByValueConverter {

  public toView<TItem extends { [property: string]: string }>(
    array: TItem[],
    value: string,
    ...properties: (keyof TItem)[]
  ) {
    value = (value || '').trim().toLowerCase();
    
    if (!value) {
      return array;
    }
    
    return array.filter(item => 
      properties.some(property => 
        (item[property] || '').toLowerCase().includes(value)));
  }
}
