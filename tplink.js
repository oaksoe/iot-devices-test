const { login } = require("tplink-cloud-api");
const uuidV4 = require("uuid/v4");
 
const TPLINK_USER = process.env.TPLINK_USER;
const TPLINK_PASS = process.env.TPLINK_PASS;
const TPLINK_TERM = process.env.TPLINK_TERM || uuidV4();

async function main() {
  // log in to cloud, return a connected tplink object
  const tplink = await login(TPLINK_USER, TPLINK_PASS, TPLINK_TERM);
  console.log("current auth token is", tplink.getToken());
 
  // get a list of raw json objects (must be invoked before .get* works)
  const dl = await tplink.getDeviceList();
  console.log(dl);
 
  let myPlug = tplink.getHS100('ioHomes smart plug');
  console.log("deviceId=", myPlug.getDeviceId());
 
  //let response = await myPlug.powerOn();
  //console.log("response=" + response );
 
  let response = await myPlug.toggle();
  console.log("response=" + response);
 
  response = await myPlug.getSysInfo();
  console.log("relay_state=" + response.relay_state);
  //console.log( JSON.parse(response).relay_state );
 
  console.log(await myPlug.getRelayState());
 
  // alternatively, map to light or plug objects that can directly be invoked (eg: .transitionLightState(...))
//   for (const d of rawDevices) {
//     const device = tplink.newDevice(d);
 
//     if (device.disconnected) {
//       // aka !connected
//       continue; // can't operate on a device that's not connected to the internet
//     }
 
//     console.log(
//       device.type,
//       "(",
//       device.genericType,
//       ") in",
//       device.humanName,
//       "is..."
//     ); // IOT.SMARTBULB (bulb) in Living Room is...
 
//     if (device.genericType === "bulb") {
//       // LB* type object
//       // alias is the same as humanName
//       if (device.alias === "Living Room") {
//         // can be replaced by .toggle(), but written here for verbosity
//         if (!(await device.isOn())) {
//           console.log("off. turning on...");
//           await device.powerOn();
//         } else {
//           console.log("on. turning off...");
//           await device.powerOff();
//         }
//       }
//     } else if (device.genericType === "plug") {
//       // HS* type object
//       if (!(await device.isOff())) {
//         device.powerOff();
//       }
//     } else {
//       // we haven't written the code... yet!
//     }
//   }
}
 
main();