export default class RideUtilities {
  static GetRideObjectIndex(identifier: string): number {
    const objects = objectManager.getAllObjects("ride").filter(o => o.identifier === identifier);
    return objects.length === 1 ? objects[0].index : -1;
  }
}
