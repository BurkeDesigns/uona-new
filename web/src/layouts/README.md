# Layouts

## Media Queries

The following are the recommeneded media queries.  Please use min/max as needed.
(inspired from https://getbootstrap.com/docs/5.3/layout/breakpoints/#media-queries)

X-Small devices (portrait phones, less than 576px)
`@media (max-width: 576px) { ... }`

Small devices (landscape phones, 576px and up)
`@media (min-width: 576px) { ... }`

Medium devices (tablets, 768px and up)
`@media (min-width: 768px) { ... }`

Large devices (desktops, 1050px and up)
`@media (min-width: 1050px) { ... }`

X-Large devices (large desktops, 1200px and up)
`@media (min-width: 1200px) { ... }`

XX-Large devices (larger desktops, 1400px and up)
`@media (min-width: 1400px) { ... }`

## .layout-- styles

A series of styles were created to ensure consistent spacing around the sections and components. Please use when applicable.

#### .layout--base
This class only adds the left and right padding at the different breakpoints

#### .layout--withBackground
Adds standardized padding to top and bottom of the component/section.

#### .layout--noBackground
If the component doesn't have a background, then this class uses margin instead of padding on top and bottom to take advantage of margin collapse.

#### .layout--fullWidthOnMobile
This is an additional class to assure the component/section goes to full width in the browser window in the mobile breakpoint

#### .layout--backgroundInner
If the section has a background and a white box within that backgrounded section, then add this class to the child to get a standardized top and bottom spacing within that white box.