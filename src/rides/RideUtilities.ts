export default class RideUtilities {
  static GetRideObjectIndex(identifiers: string[]): number {
    const ridesOfType = objectManager.getAllObjects("ride");
    const objects = ridesOfType.filter(o => identifiers.some(id => o.identifier === id));
    return objects.length > 0 ? objects[0].index : -1;
  }
}
