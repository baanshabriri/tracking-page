// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getPickrrTrackingLink from '../../services/pickkr';
import getShipRocketTrackingLink from '../../services/shipRocket';

const pickrrAppendQueryParam = 'PICK-271069';

export default async function handler(req, res) {
  let orderId = req?.query?.orderId;
  if (!orderId) {
    return res.status(400).json({ error: "Add order id" });
  }
  if (orderId.includes("#")) {
    orderId = getOrderIdWithoutHash(orderId);
  }
  var trackingLink = await getShipRocketTrackingLink(orderId);
        if (!trackingLink) {
          trackingLink = await getPickrrTrackingLink(String(orderId.concat('-', pickrrAppendQueryParam)));
        }
  res.status(200).json({ trackingLink })
}
