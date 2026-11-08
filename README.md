Sizzle Stack:
a recipe app designed to make the process of shopping, checkout, and cooking meals as simple as possilbe. This app will let you store and share recipes with your friends and then when it's time to go to the store you can pick what you want to make and it will create a grocery list for you.

HIG Implementation:
- tap targets are at least 44*44px throughout the app.
- app uses consistent color themes in the constants folder and they stay the same on each page
- supports dynamic types with a list of typography set in const that can easily be changed acrossed the whole app

- Accessibility: buttons, recipe cards, and grocery rows have VoiceOver labels, roles, and states, so a grocery item is read as a checkbox and says whether it is checked.
- Confirming destructive actions: "Clear List" opens an alert with a Cancel button and a red destructive Clear button, so the list can't be wiped by accident.

Material Design Implementation:
- Make touch targets at least 48*48dp. Similar to apples, I kept the buttons big and pressable
- Colors use contrast of at least 4:5:1. The colors are consistently contrasting each other
- Uses type scales and is now consistent acrossed the whole app and easy to manipulate.

- Ripple touch feedback: pressable elements show the Material ripple on Android, so every tap gets a visible response that stays inside rounded corners.
- Snackbars: removing a grocery item shows a snackbar at the bottom of the screen with an UNDO action that puts the item back in the same spot. It goes away on its own after 5 seconds.

Wireframe:
view wireframe.png in this same directory for this

===================================================================
        Home / Recipes                               Cart
===================================================================

+-----------------------------+     +-----------------------------+
| Sizzle Stack            (*) |     | Sizzle Stack            (*) |
+-----------------------------+     +-----------------------------+
|                             |     |                             |
|  [Q] [                   ]  |     | +-------------------------+ |
|                             |     | |                         | |
| +-------+ +-------+ +-----+ |     | +-------------------------+ |
| |       | |       | | Lime| |     | +-------------------------+ |
| | Pasta | |Cookies| | Rice| |     | |                         | |
| +-------+ +-------+ +-----+ |     | +-------------------------+ |
| +-------+ +-------+ +-----+ |     | +-------------------------+ |
| |  ...  | |  ...  | | ... | |     | |                         | |
| +-------+ +-------+ +-----+ |     | +-------------------------+ |
| +-------+ +-------+ +-----+ |     | +-------------------------+ |
| |  ...  | |  ...  | | ... | |     | |                         | |
| +-------+ +-------+ +-----+ |     | +-------------------------+ |
|                             |     | +-------------------------+ |
|                             |     | |                         | |
|                             |     | +-------------------------+ |
|                             |     |                             |
+-----------------------------+     +-----------------------------+
|   (H)        [=]        (O) |     |   (H)        [=]        (O) |
+-----------------------------+     +-----------------------------+
