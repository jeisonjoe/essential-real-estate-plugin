var ERE_MAP = ERE_MAP || {};
(function ($) {
    'use strict';

    ERE_MAP = {
        type: 'google',
        options: {
            locations: [],
            zoom: !isNaN(parseInt(ere_map_vars.zoom, 10)) ? parseInt(ere_map_vars.zoom, 10) : 12,
            minZoom: 0,
            skin: ere_map_vars.skin,
            gestureHandling: 'cooperative',// "greedy",
            cluster_marker_enable: ere_map_vars.cluster_marker_enable,
            draggable: true,
            navigationControl: true,
            mapTypeControl: true,
            streetViewControl: true,
        },
        instances: [],
        skins: [],
        getInstance: function (id) {
            for (var i = 0; i < this.instances.length; i++) {
                if (this.instances[i].id === id) {
                    return this.instances[i];
                }
            }
            return false;
        },
        getSkin: function (skin) {
            return ERE_MAP.skins[skin] ? ERE_MAP.skins[skin] : ''
        },
        addListener: function (el, e, t) {
            google.maps.event.addListener(el, e, function (e) {
                    t(e);
                }
            )
        }
    };

    /*
    * ERE_MAP.skins
    */
    ERE_MAP.skins = {
        skin1: [{
            featureType: "all",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }
            ]
        }
            ,
            {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#eeeeee"
                }
                ]
            }
            ,
            {
                featureType: "administrative.country",
                elementType: "geometry",
                stylers: [{
                    lightness: "100"
                }
                ]
            }
            ,
            {
                featureType: "administrative.country",
                elementType: "geometry.stroke",
                stylers: [{
                    lightness: "0"
                }
                    ,
                    {
                        color: "#d0ecff"
                    }
                ]
            }
            ,
            {
                featureType: "administrative.country",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.province",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "administrative.locality",
                elementType: "labels.text",
                stylers: [{
                    visibility: "simplified"
                }
                    ,
                    {
                        color: "#777777"
                    }
                ]
            }
            ,
            {
                featureType: "administrative.locality",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "simplified"
                }
                    ,
                    {
                        lightness: 60
                    }
                ]
            }
            ,
            {
                featureType: "administrative.neighborhood",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "administrative.land_parcel",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "landscape.man_made",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                    ,
                    {
                        color: "#f5f5f5"
                    }
                ]
            }
            ,
            {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{
                    color: "#fafafa"
                }
                ]
            }
            ,
            {
                featureType: "landscape.natural",
                elementType: "labels",
                stylers: [{
                    visibility: "simplified"
                }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    color: "#eeeeee"
                }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi.attraction",
                elementType: "geometry",
                stylers: [{
                    color: "#e2e8cf"
                }
                ]
            }
            ,
            {
                featureType: "poi.business",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                ]
            }
            ,
            {
                featureType: "poi.business",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi.medical",
                elementType: "all",
                stylers: [{
                    color: "#eeeeee"
                }
                ]
            }
            ,
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#ecf4d7"
                }
                ]
            }
            ,
            {
                featureType: "poi.park",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi.place_of_worship",
                elementType: "geometry",
                stylers: [{
                    color: "#eeeeee"
                }
                ]
            }
            ,
            {
                featureType: "poi.school",
                elementType: "geometry",
                stylers: [{
                    color: "#eeeeee"
                }
                ]
            }
            ,
            {
                featureType: "poi.sports_complex",
                elementType: "geometry",
                stylers: [{
                    color: "#eeeeee"
                }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    color: "#e5e5e5"
                }
                    ,
                    {
                        visibility: "simplified"
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#eeeeee"
                }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffffff"
                }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "geometry.stroke",
                stylers: [{
                    visibility: "on"
                }
                    ,
                    {
                        color: "#eeeeee"
                    }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "labels",
                stylers: [{
                    visibility: "simplified"
                }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "labels.text",
                stylers: [{
                    color: "#777777"
                }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit.line",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit.station",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#eeeeee"
                }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#d0ecff"
                }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
        ],
        skin2: [{
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{
                saturation: "0"
            }
                ,
                {
                    color: "#f3f3f3"
                }
                ,
                {
                    lightness: "-40"
                }
                ,
                {
                    gamma: "1"
                }
            ]
        }
            ,
            {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "on"
                }
                    ,
                    {
                        color: "#000000"
                    }
                    ,
                    {
                        lightness: "12"
                    }
                ]
            }
            ,
            {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#2c2d37"
                }
                    ,
                    {
                        lightness: "4"
                    }
                ]
            }
            ,
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#2c2d37"
                }
                    ,
                    {
                        lightness: 17
                    }
                    ,
                    {
                        weight: 1.2
                    }
                ]
            }
            ,
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{
                    color: "#2c2d37"
                }
                    ,
                    {
                        lightness: "25"
                    }
                    ,
                    {
                        gamma: "0.60"
                    }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    color: "#2c2d37"
                }
                    ,
                    {
                        lightness: "26"
                    }
                    ,
                    {
                        gamma: "0.49"
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#2c2d37"
                }
                    ,
                    {
                        lightness: 17
                    }
                    ,
                    {
                        gamma: "0.60"
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#2c2d37"
                }
                    ,
                    {
                        lightness: 29
                    }
                    ,
                    {
                        weight: .2
                    }
                    ,
                    {
                        gamma: "0.60"
                    }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{
                    color: "#2c2d37"
                }
                    ,
                    {
                        lightness: 18
                    }
                    ,
                    {
                        gamma: "0.60"
                    }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{
                    color: "#2c2d37"
                }
                    ,
                    {
                        lightness: 16
                    }
                    ,
                    {
                        gamma: "0.60"
                    }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#2c2d37"
                }
                    ,
                    {
                        lightness: "29"
                    }
                    ,
                    {
                        gamma: "0.60"
                    }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#3c3d47"
                }
                    ,
                    {
                        lightness: "16"
                    }
                    ,
                    {
                        gamma: "0.50"
                    }
                ]
            }
        ],
        skin3: [{
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                color: "#e9e9e9"
            }
                ,
                {
                    lightness: 17
                }
            ]
        }
            ,
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }
                    ,
                    {
                        lightness: 20
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffffff"
                }
                    ,
                    {
                        lightness: 17
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#ffffff"
                }
                    ,
                    {
                        lightness: 29
                    }
                    ,
                    {
                        weight: .2
                    }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }
                    ,
                    {
                        lightness: 18
                    }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }
                    ,
                    {
                        lightness: 16
                    }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }
                    ,
                    {
                        lightness: 21
                    }
                ]
            }
            ,
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#dedede"
                }
                    ,
                    {
                        lightness: 21
                    }
                ]
            }
            ,
            {
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "on"
                }
                    ,
                    {
                        color: "#ffffff"
                    }
                    ,
                    {
                        lightness: 16
                    }
                ]
            }
            ,
            {
                elementType: "labels.text.fill",
                stylers: [{
                    saturation: 36
                }
                    ,
                    {
                        color: "#333333"
                    }
                    ,
                    {
                        lightness: 40
                    }
                ]
            }
            ,
            {
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#f2f2f2"
                }
                    ,
                    {
                        lightness: 19
                    }
                ]
            }
            ,
            {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#fefefe"
                }
                    ,
                    {
                        lightness: 20
                    }
                ]
            }
            ,
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#fefefe"
                }
                    ,
                    {
                        lightness: 17
                    }
                    ,
                    {
                        weight: 1.2
                    }
                ]
            }
        ],
        skin4: [{
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#444444"
            }
            ]
        }
            ,
            {
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    color: "#f2f2f2"
                }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }
                    ,
                    {
                        lightness: 45
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "all",
                stylers: [{
                    color: "#46bcec"
                }
                    ,
                    {
                        visibility: "on"
                    }
                ]
            }
        ],
        skin5: [{
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                color: "#f7f1df"
            }
            ]
        }
            ,
            {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{
                    color: "#d0e3b4"
                }
                ]
            }
            ,
            {
                featureType: "landscape.natural.terrain",
                elementType: "geometry",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi.business",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi.medical",
                elementType: "geometry",
                stylers: [{
                    color: "#fbd3da"
                }
                ]
            }
            ,
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#bde6ab"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffe15f"
                }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#efd151"
                }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffffff"
                }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "geometry.fill",
                stylers: [{
                    color: "black"
                }
                ]
            }
            ,
            {
                featureType: "transit.station.airport",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#cfb2db"
                }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#a2daf2"
                }
                ]
            }
        ],
        skin6: [{
            featureType: "administrative",
            elementType: "all",
            stylers: [{
                visibility: "off"
            }
            ]
        }
            ,
            {
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                    ,
                    {
                        hue: "#0066ff"
                    }
                    ,
                    {
                        saturation: 74
                    }
                    ,
                    {
                        lightness: 100
                    }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                    ,
                    {
                        weight: .6
                    }
                    ,
                    {
                        saturation: -85
                    }
                    ,
                    {
                        lightness: 61
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "all",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                    ,
                    {
                        color: "#5f94ff"
                    }
                    ,
                    {
                        lightness: 26
                    }
                    ,
                    {
                        gamma: 5.86
                    }
                ]
            }
        ],
        skin7: [{
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                color: "#a0d6d1"
            }
                ,
                {
                    lightness: 17
                }
            ]
        }
            ,
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }
                    ,
                    {
                        lightness: 20
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#dedede"
                }
                    ,
                    {
                        lightness: 17
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#dedede"
                }
                    ,
                    {
                        lightness: 29
                    }
                    ,
                    {
                        weight: .2
                    }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{
                    color: "#dedede"
                }
                    ,
                    {
                        lightness: 18
                    }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }
                    ,
                    {
                        lightness: 16
                    }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    color: "#f1f1f1"
                }
                    ,
                    {
                        lightness: 21
                    }
                ]
            }
            ,
            {
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "on"
                }
                    ,
                    {
                        color: "#ffffff"
                    }
                    ,
                    {
                        lightness: 16
                    }
                ]
            }
            ,
            {
                elementType: "labels.text.fill",
                stylers: [{
                    saturation: 36
                }
                    ,
                    {
                        color: "#333333"
                    }
                    ,
                    {
                        lightness: 40
                    }
                ]
            }
            ,
            {
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#f2f2f2"
                }
                    ,
                    {
                        lightness: 19
                    }
                ]
            }
            ,
            {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#fefefe"
                }
                    ,
                    {
                        lightness: 20
                    }
                ]
            }
            ,
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#fefefe"
                }
                    ,
                    {
                        lightness: 17
                    }
                    ,
                    {
                        weight: 1.2
                    }
                ]
            }
        ],
        skin8: [{
            featureType: "all",
            stylers: [{
                saturation: 0
            }
                ,
                {
                    hue: "#e7ecf0"
                }
            ]
        }
            ,
            {
                featureType: "road",
                stylers: [{
                    saturation: -70
                }
                ]
            }
            ,
            {
                featureType: "transit",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "water",
                stylers: [{
                    visibility: "simplified"
                }
                    ,
                    {
                        saturation: -60
                    }
                ]
            }
        ],
        skin9: [{
            featureType: "all",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }
            ]
        }
            ,
            {
                featureType: "all",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.country",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.country",
                elementType: "labels.text",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.province",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.province",
                elementType: "labels.text",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.locality",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.neighborhood",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.land_parcel",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    hue: "#FFBB00"
                }
                    ,
                    {
                        saturation: 43.400000000000006
                    }
                    ,
                    {
                        lightness: 37.599999999999994
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{
                    saturation: "-40"
                }
                    ,
                    {
                        lightness: "36"
                    }
                ]
            }
            ,
            {
                featureType: "landscape.man_made",
                elementType: "geometry",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "landscape.natural",
                elementType: "geometry.fill",
                stylers: [{
                    saturation: "-77"
                }
                    ,
                    {
                        lightness: "28"
                    }
                ]
            }
            ,
            {
                featureType: "landscape.natural",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    hue: "#ff0091"
                }
                    ,
                    {
                        saturation: -44
                    }
                    ,
                    {
                        lightness: 11.200000000000017
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                    ,
                    {
                        saturation: -81
                    }
                ]
            }
            ,
            {
                featureType: "poi.attraction",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{
                    saturation: "-24"
                }
                    ,
                    {
                        lightness: "61"
                    }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{
                    hue: "#ff0048"
                }
                    ,
                    {
                        saturation: -78
                    }
                    ,
                    {
                        lightness: 45.599999999999994
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.highway.controlled_access",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "all",
                stylers: [{
                    hue: "#FF0300"
                }
                    ,
                    {
                        saturation: -100
                    }
                    ,
                    {
                        lightness: 51.19999999999999
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "all",
                stylers: [{
                    hue: "#ff0300"
                }
                    ,
                    {
                        saturation: -100
                    }
                    ,
                    {
                        lightness: 52
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "geometry.stroke",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit.line",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit.station",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "all",
                stylers: [{
                    hue: "#789cdb"
                }
                    ,
                    {
                        saturation: -66
                    }
                    ,
                    {
                        lightness: 2.4000000000000057
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
        ],
        skin10: [{
            featureType: "all",
            elementType: "labels",
            stylers: [{
                visibility: "on"
            }
            ]
        }
            ,
            {
                featureType: "administrative.country",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.country",
                elementType: "labels.text",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.province",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.province",
                elementType: "labels.text",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.locality",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.neighborhood",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "administrative.land_parcel",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    hue: "#FFBB00"
                }
                    ,
                    {
                        saturation: 43.400000000000006
                    }
                    ,
                    {
                        lightness: 37.599999999999994
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{
                    saturation: "-40"
                }
                    ,
                    {
                        lightness: "36"
                    }
                ]
            }
            ,
            {
                featureType: "landscape.man_made",
                elementType: "geometry",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "landscape.natural",
                elementType: "geometry.fill",
                stylers: [{
                    saturation: "-77"
                }
                    ,
                    {
                        lightness: "28"
                    }
                ]
            }
            ,
            {
                featureType: "landscape.natural",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    hue: "#00FF6A"
                }
                    ,
                    {
                        saturation: -1.0989010989011234
                    }
                    ,
                    {
                        lightness: 11.200000000000017
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi.attraction",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{
                    saturation: "-24"
                }
                    ,
                    {
                        lightness: "61"
                    }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{
                    hue: "#FFC200"
                }
                    ,
                    {
                        saturation: -61.8
                    }
                    ,
                    {
                        lightness: 45.599999999999994
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.highway.controlled_access",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.arterial",
                elementType: "all",
                stylers: [{
                    hue: "#FF0300"
                }
                    ,
                    {
                        saturation: -100
                    }
                    ,
                    {
                        lightness: 51.19999999999999
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "all",
                stylers: [{
                    hue: "#ff0300"
                }
                    ,
                    {
                        saturation: -100
                    }
                    ,
                    {
                        lightness: 52
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "road.local",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "geometry.stroke",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit.line",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit.station",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "all",
                stylers: [{
                    hue: "#0078FF"
                }
                    ,
                    {
                        saturation: -13.200000000000003
                    }
                    ,
                    {
                        lightness: 2.4000000000000057
                    }
                    ,
                    {
                        gamma: 1
                    }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
        ],
        skin11: [{
            featureType: "all",
            elementType: "labels",
            stylers: [{
                visibility: "on"
            }
            ]
        }
            ,
            {
                featureType: "administrative.country",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "administrative.country",
                elementType: "labels.text",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [{
                    color: "#262c33"
                }
                ]
            }
            ,
            {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{
                    gamma: .01
                }
                    ,
                    {
                        lightness: 20
                    }
                    ,
                    {
                        color: "#949aa6"
                    }
                ]
            }
            ,
            {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{
                    saturation: -31
                }
                    ,
                    {
                        lightness: -33
                    }
                    ,
                    {
                        weight: 2
                    }
                    ,
                    {
                        gamma: "0.00"
                    }
                    ,
                    {
                        visibility: "off"
                    }
                ]
            }
            ,
            {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "administrative.province",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "administrative.locality",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }
                ]
            }
            ,
            {
                featureType: "administrative.locality",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "administrative.neighborhood",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "administrative.land_parcel",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{
                    lightness: 30
                }
                    ,
                    {
                        saturation: 30
                    }
                    ,
                    {
                        color: "#353c44"
                    }
                    ,
                    {
                        visibility: "on"
                    }
                ]
            }
            ,
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    saturation: "0"
                }
                    ,
                    {
                        lightness: "0"
                    }
                    ,
                    {
                        gamma: "0.30"
                    }
                    ,
                    {
                        weight: "0.01"
                    }
                    ,
                    {
                        visibility: "off"
                    }
                ]
            }
            ,
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    lightness: "100"
                }
                    ,
                    {
                        saturation: -20
                    }
                    ,
                    {
                        visibility: "simplified"
                    }
                    ,
                    {
                        color: "#31383f"
                    }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    lightness: 10
                }
                    ,
                    {
                        saturation: -30
                    }
                    ,
                    {
                        color: "#2a3037"
                    }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{
                    saturation: "-100"
                }
                    ,
                    {
                        lightness: "-100"
                    }
                    ,
                    {
                        gamma: "0.00"
                    }
                    ,
                    {
                        color: "#2a3037"
                    }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels.text",
                stylers: [{
                    visibility: "on"
                }
                    ,
                    {
                        color: "#575e6b"
                    }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#4c5561"
                }
                    ,
                    {
                        visibility: "on"
                    }
                ]
            }
            ,
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "transit.station.airport",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }
                ]
            }
            ,
            {
                featureType: "water",
                elementType: "all",
                stylers: [{
                    lightness: -20
                }
                    ,
                    {
                        color: "#2a3037"
                    }
                ]
            }
        ],
        skin12: []
    };

    /**
     * ERE_MAP.LatLng
     * @param latitude
     * @param longitude
     * @constructor
     */
    ERE_MAP.LatLng = function (latitude, longitude) {
        this.init(latitude, longitude);
    };

    ERE_MAP.LatLng.prototype.init = function (latitude, longitude){
        this.latitude = latitude;
        this.longitude = longitude;
        this.latlng = new google.maps.LatLng(latitude, longitude)
    };

    ERE_MAP.LatLng.prototype.getLatitude = function (){
        return this.latlng.lat();
    };

    ERE_MAP.LatLng.prototype.getLongitude = function (){
        return this.latlng.lng();
    };

    ERE_MAP.LatLng.prototype.toGeocoderFormat = function () {
        return this.latlng;
    };

    ERE_MAP.LatLng.prototype.getSourceObject = function () {
        return this.latlng;
    };


    /**
     * ERE_MAP.LatLngBounds
     * @param southwest
     * @param northeast
     * @constructor
     */
    ERE_MAP.LatLngBounds = function (southwest, northeast) {
        this.init(southwest, northeast)
    };


    ERE_MAP.LatLngBounds.prototype.init = function (southwest, northeast){
        this.southwest = southwest;
        this.northeast = northeast;
        this.bounds = new google.maps.LatLngBounds(southwest, northeast);
    };

    ERE_MAP.LatLngBounds.prototype.getSourceObject = function () {
        return this.bounds;
    };
    ERE_MAP.LatLngBounds.prototype.extend = function (e) {
        this.bounds.extend(e.getSourceObject());
    };


    /**
     * ERE_MAP.Clusterer
     * @param e
     * @constructor
     */
    ERE_MAP.Clusterer = function (e) {
        this.init(e);
    };

    ERE_MAP.Clusterer.prototype.init = function (e) {
        this.map = e;
        var options = {
            clusterClass: 'ere__cluster',
            styles: [
                {
                    textColor: "#fff",
                    height: 35,
                    width: 35
                }
            ]
        };
        this.clusterer = new MarkerClusterer(this.map.getSourceObject(), this.getMarkers(), options);
    };

    ERE_MAP.Clusterer.prototype.getMarkers = function (){
        return this.map.markers.map(function (e) {
                return e.getSourceObject();
            }
        )
    };

    ERE_MAP.Clusterer.prototype.update = function () {
        this.clusterer.clearMarkers();
        this.clusterer.addMarkers(this.getMarkers());
    };

    ERE_MAP.Clusterer.prototype.setMaxZoom = function (e) {
        this.clusterer.setMaxZoom(e);
    };

    ERE_MAP.Clusterer.prototype.repaint = function () {
        this.clusterer.repaint();
    }



    /**
     * ERE_MAP.ERE_MAP
     * ERE_MAP.ERE_MAP
     * @param options
     * @constructor
     */
    ERE_MAP.Marker = function (options) {
        var newConfigMarker = $.parseJSON(JSON.stringify(ere_map_vars.marker));
        this.options = $.extend(true, {
            position: false,
            map: false,
            popup: false,
            animation: false,
            draggable: false,
            template: {
                type: 'basic', // 'simple'| 'basic'
                marker: newConfigMarker,
                id: ''
            }
        }, options);
        this.init();
    };

    ERE_MAP.Marker.prototype.init = function (){
        if (this.options.template.type === 'basic') {
            this.marker = new ERE_MAP.MarkerOverLay(this);
        } else {
            this.marker = new google.maps.Marker({
                position: this.options.position.latlng,
                map: this.options.map.map,
                draggable: this.options.draggable,
                animation: this.options.animation
            });
        }
        if (this.options.position) {
            this.setPosition(this.options.position);
        }

        if (this.options.map) {
            this.setMap(this.options.map);
        }
    };

    ERE_MAP.Marker.prototype.setPosition = function (e){
        this.marker.setPosition(e.getSourceObject());
        return this;
    };

    ERE_MAP.Marker.prototype.getPosition = function () {
        return this.options.position;
    };

    ERE_MAP.Marker.prototype.setMap = function (e) {
        this.marker.setMap(e.getSourceObject());
        return this;
    };

    ERE_MAP.Marker.prototype.remove = function () {
        if (this.options.popup) {
            this.options.popup.remove();
        }
        this.marker.setMap(null);
        this.marker.remove();
        return this;
    };

    ERE_MAP.Marker.prototype.getSourceObject = function () {
        return this.marker;
    };


    ERE_MAP.Marker.prototype.getTemplate = function () {
        var e = document.createElement("div");
        e.className = "ere__marker-container ere__marker-" +  this.options.template.marker.type;
        e.id = this.options.template.id;
        var template = wp.template('ere__marker_template');
        var t = template({
            icon : this.options.template.marker.html
        });
        $(e).append(t);
        this.$element = $(e);
        return e;
    };

    ERE_MAP.Marker.prototype.active = function () {
        this.$element.addClass('active');
        $(this.marker.args.template).trigger('click');
    };

    ERE_MAP.Marker.prototype.hide = function () {
        this.$element.addClass('hide');
    };

    ERE_MAP.Marker.prototype.show = function () {
        this.$element.removeClass('hide');
    };

    /**
     * ERE_MAP.MarkerOverLay
     * @param e
     * @constructor
     */
    ERE_MAP.MarkerOverLay = function (e) {
        this.args = {
            marker: e,
            template: null,
            position: e.getPosition().getSourceObject(),
            map: e.options.map,
            animation: e.options.animation,
            popup: e.options.popup,
            draggable: e.options.draggable
        };
        if (this.args.map && this.args.popup) {
            this.args.popup.setMap(this.args.map);
        }
    };

    "undefined" != typeof google && (ERE_MAP.MarkerOverLay.prototype = new google.maps.OverlayView);

    ERE_MAP.MarkerOverLay.prototype.onAdd = function () {
        var self = this;
        if (!this.args.template) {
            this.args.template = this.args.marker.getTemplate();
            if (this.args.map && this.args.popup) {
                google.maps.event.addDomListener(this.args.template, 'click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.args.map.closePopups();
                    self.args.popup.setPosition(self.args.marker.getPosition());

                    var $marker = $(this).find('.ere__pin-wrap'),
                        marker_bottom = parseInt($marker.css('bottom').replace('px', '')),
                        marker_height = $marker.height();
                    if (!isNaN(marker_bottom)) {
                        marker_height = marker_height + marker_bottom;
                    }
                    self.args.popup.popup.setOptions({
                        boxStyle: {
                            margin: '0 0 ' + marker_height + 'px 0'
                        }
                    });
                    self.args.popup.show();

                    self.args.marker.active();
                });
            }
            this.getPanes().overlayMouseTarget.appendChild(this.args.template);
        }
    };

    ERE_MAP.MarkerOverLay.prototype.draw = function () {
        this.setPosition();
    };

    ERE_MAP.MarkerOverLay.prototype.remove = function () {
        if (this.args.template) {
            this.args.template.parentNode.removeChild(this.args.template);
            this.args.template = null;
        }
    };

    ERE_MAP.MarkerOverLay.prototype.getPosition = function () {
        return this.args.position;
    };



    ERE_MAP.MarkerOverLay.prototype.setPosition = function () {
        if (this.args.template && !(!this.args.position instanceof google.maps.LatLng)) {
            var projection = this.getProjection();
            var position = projection.fromLatLngToDivPixel(this.args.position);
            this.args.template.style.left = position.x + "px";
            this.args.template.style.top = position.y + "px";
        }
    };

    ERE_MAP.MarkerOverLay.prototype.getDraggable = function () {
        return this.args.draggable;
    };

    /**
     * ERE_MAP.Geocoder
     * @constructor
     */
    ERE_MAP.Geocoder = function () {
        this.init();
    };

    ERE_MAP.Geocoder.prototype.init = function () {
        this.geocoder = new google.maps.Geocoder();
    };

    ERE_MAP.Geocoder.prototype.setMap = function (e) {
        this.map = e;
    };

    ERE_MAP.Geocoder.prototype.geocode = function (e, t, i) {
        var self = this,
            r = {},
            o = false;


        if (typeof t === 'function') {
            i = t;
            t = {};
        }


        if (e instanceof google.maps.LatLng) {
            r.location = e;
        } else if (e instanceof ERE_MAP.LatLng) {
            r.location = e.getSourceObject();
        } else {
            if ("string" != typeof e || !e.length) return i(o);
            r.address = e;
        }

        t = $.extend({
            limit: 1
        }, t);

        this.geocoder.geocode(r, function (results, status) {
            if (status === 'OK' && results && results.length) {
                o = t.limit === 1 ? self.formatFeature(results[0]) : results.map(self.formatFeature);
            }
            return i(o);
        });
    };

    ERE_MAP.Geocoder.prototype.formatFeature = function (e) {
        return {
            location: new ERE_MAP.LatLng(e.geometry.location.lat(), e.geometry.location.lng()),
            latitude: e.geometry.location.lat(),
            longitude: e.geometry.location.lng(),
            address: e.formatted_address
        }
    };

    /**
     * ERE_MAP.Autocomplete
     * */
    ERE_MAP.Autocomplete = function (e) {
        $(e).data('autocomplete', this);
        this.init(e);
    };

    ERE_MAP.Autocomplete.prototype.init = function (e) {
        if (!(e instanceof Element)) return false;
        this.element = e;
        this.$element = $(e);
        this.options = {};

        if (ere_map_vars.types.length) {
            this.options.types = [ere_map_vars.types];
        }

        if (ere_map_vars.countries.length) {
            this.options.componentRestrictions = {
                country: ere_map_vars.countries
            };
        }

        this.geocoder = new ERE_MAP.Geocoder();
        this.autocomplete = new google.maps.places.Autocomplete(this.element, this.options);
        this.$element.on('keydown', function (e) {
            if (e.which === 13) {
                e.preventDefault();
            }
        });
    };

    ERE_MAP.Autocomplete.prototype.change = function (t) {
        var self = this;
        this.autocomplete.addListener('place_changed', function () {
            var place = self.autocomplete.getPlace();
            var e = false;
            if (typeof place.geometry !== "undefined") {
                e = self.geocoder.formatFeature(self.autocomplete.getPlace());
            } else if (typeof place.name !== 'undefined') {
                self.geocoder.geocode(place.name, function (e) {
                    if (e) {
                        self.$element.val(e.address);
                        t(e);
                    }
                });
            }
            t(e);
        });
    };

    /**
     * ERE_MAP.Popup
     * @param e
     * @constructor
     */
    ERE_MAP.Popup = function (e) {
        this.options = $.extend(true, {
            content: "",
            classes: "ere__map-popup-wrap ere__map-popup-google",
            position: false,
            map: false,
            width: false,
            type: ''
        }, e);

        if (this.options.type !== '') {
            this.options.classes = this.options.classes + ' ' + this.options.type
        }


        this.init(e);
    };

    ERE_MAP.Popup.prototype.init = function (e) {
        this.template_name = "default";
        this.popup = new InfoBox({
                content: "",
                disableAutoPan: false,
                maxWidth: 0,
                zIndex: 5e8,
                boxClass: this._getBoxClass(),
                boxStyle: {
                    width: this.options.width ? this.options.width : "300px",
                    zIndex: 5e6
                },
                //closeBoxURL: "",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false,
                alignBottom: true
            }
        );

        if (this.options.position) {
            this.setPosition(this.options.position);
        }

        if (this.options.content) {
            this.setContent(this.options.content);
        }

        if (this.options.map) {
            this.setMap(this.options.map);
        }
    };

    ERE_MAP.Popup.prototype.setContent = function (e) {
        this.popup.setContent(e);
        return this;
    };

    ERE_MAP.Popup.prototype.setPosition = function (e) {
        this.popup.setPosition(e.getSourceObject());
        return this;
    };

    ERE_MAP.Popup.prototype.setMap = function (e) {
        this.map = e;
        return this;
    };

    ERE_MAP.Popup.prototype.remove = function () {
        this.popup.close();
        return this;

    };

    ERE_MAP.Popup.prototype.show = function () {
        return this.popup.getVisible() ? this : (this.popup.open(this.map.getSourceObject()), setTimeout(function () {
            this.popup.setOptions({
                    boxClass: this._getBoxClass() + " show"
                }
            )
        }
            .bind(this), 5), this)
    };

    ERE_MAP.Popup.prototype.hide = function () {
        return this.popup.getVisible() ? (this.remove(), this.popup.setOptions({
                boxClass: this._getBoxClass()
            }
        ), this) : this
    };

    ERE_MAP.Popup.prototype._getBoxClass = function () {
        return [this.options.classes ? this.options.classes : "", "tpl-" + this.template_name].join(" ");
    };

    /**
     * ERE_MAP.MAP
     * @param element
     * @constructor
     */
    ERE_MAP.MAP = function (element) {
        this.$element = $(element);
        this.element = element;
        this.init();
    };

    ERE_MAP.MAP.prototype.init = function () {
        this.options = $.extend({}, ERE_MAP.options, this.$element.data('options'));
        this.markers = [];
        this.bounds = new ERE_MAP.LatLngBounds;
        this.id = typeof (this.$element.attr('id')) !== 'undefined' ? this.$element.attr('id') : false;
        this.events = {};
        var map_options = {
            zoom: parseInt(this.options.zoom, 10),
            minZoom: this.options.minZoom,
            draggable: this.options.draggable,
            navigationControl: this.options.navigationControl,
            mapTypeControl: this.options.mapTypeControl,
            streetViewControl: this.options.streetViewControl,

        }

        var map_styles = ERE_MAP.getSkin(this.options.skin);
        if (map_styles !== '') {
            map_options.styles = map_styles;
        }

        this.map = new google.maps.Map(this.element, map_options);

        this.setCenter(new ERE_MAP.LatLng(0, 0));
        this.maybeAddMarkers();

        if (this.options.cluster_marker_enable) {
            this.clusterer = new ERE_MAP.Clusterer(this);
            this.addListener('updated_markers', this._updateCluster.bind(this));
        }

        this.addListener("zoom_changed", this.closePopups.bind(this));
        this.addListener("click", this.closePopups.bind(this));
        this.addListener("click", this.deactiveMarker.bind(this));



        ERE_MAP.instances.push({
            id: this.id,
            map: this.map,
            instance: this
        });
    };

    ERE_MAP.MAP.prototype.maybeAddMarkers = function() {
        var location = this.$element.data('location');
        if (location && location.position) {
            this.trigger('updating_markers');
            var position = new ERE_MAP.LatLng(location.position.lat, location.position.lng);

            var marker_option = {
                position: position,
                map: this,
                template: {
                }
            };

            if (location.marker) {
                marker_option.template.marker = location.marker;
            }

            if (location.marker_type) {
                marker_option.template.type = location.marker_type;
            }

            if (location.id) {
                marker_option.template.id = location.id;
            }

            if (location.popup) {
                var template = wp.template('ere__map_popup_template');
                var content_popup = template({
                    title: location.popup.title,
                    url : location.popup.url,
                    thumb: location.popup.thumb,
                    price: location.popup.price,
                    address: location.popup.address
                });


                marker_option.popup = new ERE_MAP.Popup({
                    content: content_popup
                });
            }
            var marker = new ERE_MAP.Marker(marker_option);
            this.markers.push(marker);
            this.setCenter(position);
            this.trigger("updated_markers");
        }
    };

    ERE_MAP.MAP.prototype.setZoom = function (e) {
        this.map.setZoom(e);
    };

    ERE_MAP.MAP.prototype.resetZoom = function (e) {
        this.setZoom(this.options.zoom);
    };

    ERE_MAP.MAP.prototype.getZoom = function () {
        return this.map.getZoom();
    };


    ERE_MAP.MAP.prototype.setCenter = function (e) {
        this.map.setCenter(e.getSourceObject());
    };

    ERE_MAP.MAP.prototype.fitBounds = function (e) {
        this.map.fitBounds(e.getSourceObject());
    };

    ERE_MAP.MAP.prototype.panTo = function (e) {
        this.map.panTo(e.getSourceObject());
    };

    ERE_MAP.MAP.prototype.getClickPosition = function (e) {
        return new ERE_MAP.LatLng(e.latLng.lat(), e.latLng.lng());
    };

    ERE_MAP.MAP.prototype.getDragPosition = function (e) {
        return new ERE_MAP.LatLng(e.latLng.lat(), e.latLng.lng());
    };

    ERE_MAP.MAP.prototype.addListener = function (e, t) {
        google.maps.event.addListener(this.map, this.getSourceEvent(e), function (e) {
                t(e);
            }
        )
    };

    ERE_MAP.MAP.prototype.addListenerOnce = function (e, t) {
        google.maps.event.addListenerOnce(this.map, this.getSourceEvent(e), function (e) {
                t(e);
            }
        );
    };

    ERE_MAP.MAP.prototype.trigger = function (e) {
        google.maps.event.trigger(this.map, this.getSourceEvent(e));
    };

    ERE_MAP.MAP.prototype.getSourceObject = function () {
        return this.map;
    };


    ERE_MAP.MAP.prototype.getSourceEvent = function (e) {
        return void 0 !== this.events[e] ? this.events[e] : e;
    };

    ERE_MAP.MAP.prototype.closePopups = function () {
        for (var i = 0; i < this.markers.length; i++) {
            if ("object" === typeof (this.markers[i].options.popup)) {
                this.markers[i].options.popup.hide();
            }
        }
    };

    ERE_MAP.MAP.prototype.removeMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].remove();
        }
        this.markers.length = 0;
        this.markers = [];
    };

    ERE_MAP.MAP.prototype._updateCluster = function () {
        this.clusterer || (this.clusterer = new ERE_MAP.Clusterer(this));
        setTimeout(function () {
            this.clusterer.update();
        }.bind(this), 5);
    };

    ERE_MAP.MAP.prototype.refresh = function () {
    };


    ERE_MAP.MAP.prototype.activeMarker = function(id) {
        if (this.options.cluster_markers) {
            this.clusterer.setMaxZoom(1);
            this.clusterer.repaint();
        }

        var self = this;
        clearTimeout(this.timeOutActive);
        this.timeOutActive = setTimeout(function () {
            for (var i = 0; i < self.markers.length; i++) {
                if (self.markers[i].options.template.id == id) {
                    self.markers[i].active();
                    break;
                }
            }
        },10);
    };

    ERE_MAP.MAP.prototype.deactiveMarker = function() {
        var self = this;
        if (self.options.cluster_markers) {
            self.clusterer.setMaxZoom(13);
            self.clusterer.repaint();
        }
        self.$element.find('.ere__marker-container').removeClass('active');
        self.closePopups();
    };


    /**
     * ERE_MAP.DirectionsService
     * @constructor
     */
    ERE_MAP.DirectionsService = function () {
        this.init();
    };

    ERE_MAP.DirectionsService.prototype.init = function (){
        this.directionsService = new google.maps.DirectionsService;

    };

    ERE_MAP.DirectionsService.prototype.route = function (request, i){
        var result = false;
        request = $.extend(true, {
            travelMode: 'DRIVING',
            origin: '',
            destination: ''
        }, request);

        if (request.origin instanceof ERE_MAP.LatLng) {
            request.origin = request.origin.getSourceObject();
        }

        if (request.destination instanceof ERE_MAP.LatLng) {
            request.destination = request.destination.getSourceObject();
        }

        this.directionsService.route(request, function(response,status) {
            if (status === google.maps.DirectionsStatus.OK) {
                result = response;
            }
            return  i(result);
        });
    };

    ERE_MAP.DirectionsService.prototype.getSourceObject = function () {
        return this.directionsService;
    };

    /**
     * ERE_MAP.DirectionsRenderer
     * @constructor
     */
    ERE_MAP.DirectionsRenderer = function () {
        this.init();
    };

    ERE_MAP.DirectionsRenderer.prototype.init = function () {
        this.directionsRenderer = new google.maps.DirectionsRenderer;
    };

    ERE_MAP.DirectionsRenderer.prototype.getSourceObject = function () {
        return this.directionsRenderer;
    };

    ERE_MAP.DirectionsRenderer.prototype.setMap = function (e) {
        this.directionsRenderer.setMap(e.getSourceObject());
        return this;
    };


    ERE_MAP.DirectionsRenderer.prototype.setDirections = function (directions) {
        this.directionsRenderer.setDirections(directions);
        return this;
    };

    ERE_MAP.DirectionsRenderer.prototype.getDirections = function () {
        return  this.directionsRenderer.getDirections();
    };

    ERE_MAP.DirectionsRenderer.prototype.change = function (t) {
        var self = this;
        self.directionsRenderer.addListener('directions_changed', function () {
            var total = 0;
            var myroute = self.directionsRenderer.getDirections().routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
            }
            t(total);

        });
    };
    ERE_MAP.DirectionsRenderer.prototype.clear = function () {
        this.directionsRenderer.setMap(null);
    };

    /**
     * ERE_MAP.PlacesService
     * @constructor
     */
    ERE_MAP.PlacesService = function (options) {
        this.options = $.extend({
            maxResultCount: 20,
            includedTypes : [],
            radius: 5000,
            rankPreference: '',
            position: false,
            map: false,
        }, options);
        this.init();
    };

    ERE_MAP.PlacesService.prototype.init = function () {
        if (this.options.map) {
            this.setMap(this.options.map);
        }

        if (this.options.position) {
            this.setPosition(this.options.position);
        }
    };

    ERE_MAP.PlacesService.prototype.setMap = function (e) {
        this.map = e;
        return this;
    };

    ERE_MAP.PlacesService.prototype.setPosition = function (e) {
        this.position = e;
        return this;
    };

    ERE_MAP.PlacesService.prototype.nearbySearch = function (t) {
        var self = this;
        var requestUrl = 'https://places.googleapis.com/v1/places:searchNearby';
        var request = {
            maxResultCount: this.options.maxResultCount,
            includedTypes: this.options.includedTypes,
            locationRestriction : {
                circle : {
                    center : {
                        latitude : this.position.getLatitude(),
                        longitude : this.position.getLongitude()
                    },
                    radius:  this.options.radius
                }
            },
        };

        if (this.options.rankPreference === 'distance') {
            request.rankPreference = "DISTANCE";
        }

        $.ajax({
            type: "POST",
            url: requestUrl,
            data: JSON.stringify(request),
            dataType: 'json',
            crossDomain: true,
            headers: {
                "X-Goog-Api-Key": ere_map_vars.api_key,
                'Content-Type' : 'application/json',
                'X-Goog-FieldMask': '*'
            },
            success: function(response) {
                var result = false;
                if (response.places) {
                    result = [];
                    $.each(response.places,function (index, value){
                        var place = self.getPlace(value);
                        result.push(place);
                    });
                }
                t(result);
            },
            error: function(response) {
                t(false);
            }
        });
    };

    ERE_MAP.PlacesService.prototype.getPlace = function (place) {
        return {
            types: place.types,
            displayName: place.displayName.text,
            lat: place.location.latitude,
            lng: place.location.longitude
        }
    };





    typeof (google) !== 'undefined' && typeof (ere_map_vars) !== 'undefined' && google.maps.event.addDomListener(window, 'load', function () {
        if (typeof ere_map_vars.skin_custom === 'object' && ere_map_vars.skin === 'custom') {
            try {
                ERE_MAP.skins.custom = JSON.parse(ere_map_vars.skin_custom);
            } catch (e) {
                ERE_MAP.skins.custom = [];
            }
        }

        $('.ere__map-canvas:not(.manual)').each(function () {
            new ERE_MAP.MAP(this);
        });
        $(document).trigger("maps:loaded");
    });

})(jQuery);