/*
 * PUBLIC SUPPORT CONFIGURATION
 * --------------------------------
 * Edit this file when payment methods or public profile links change.
 *
 * Never put passwords, API keys, private tokens, bank credentials, or other
 * secrets here. Anything in this file is public after deployment.
 *
 * Supported method types:
 *   link       - public external URL
 *   qr         - public QR image path + optional public URL
 *   copy       - public identifier that visitors may copy
 *   local      - public local payment page/link
 *   platform   - public donation platform URL
 */

const supportMethods = {
  bangladesh: [
    {
      name: "bKash",
      enabled: false,
      type: "link",
      url: ""
    },
    {
      name: "Nagad",
      enabled: false,
      type: "link",
      url: ""
    },
    {
      name: "Other local payment method",
      enabled: false,
      type: "link",
      url: ""
    }
  ],

  international: [
    {
      name: "International Donation",
      enabled: false,
      type: "platform",
      url: ""
    },
    {
      name: "Other international payment method",
      enabled: false,
      type: "link",
      url: ""
    }
  ]
};

/*
 * Public profile links used in the footer.
 * Leave a value empty to hide that link.
 */
const publicLinks = {
  github: "",
  linkedin: "",
  portfolio: ""
};
