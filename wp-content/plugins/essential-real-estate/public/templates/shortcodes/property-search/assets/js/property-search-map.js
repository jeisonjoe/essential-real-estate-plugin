var ERE_Property_Map_Search = ERE_Property_Map_Search || {};
(function ($) {
    'use strict';
    var ajax_url = '';// ere_search_vars.ajax_url;
    var price_is_slider = '';// ere_search_vars.price_is_slider;
    var css_class_wrap = '.ere-search-properties-map';
    var ere_map, markers = [];
    var is_mobile = false;
    var infobox;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        is_mobile = true;
    }
    ERE_Property_Map_Search = {
        init: function () {
            if ($(css_class_wrap).length === 0) {
                return;
            }

	        if (typeof ($(css_class_wrap).data('options')) !== "undefined") {
		        window['ere_search_vars'] = $(css_class_wrap).data('options');
	        }

	        if (typeof (ere_search_vars) === "undefined") {
		        return;
	        }


            ajax_url =  ere_search_vars.ajax_url;
            price_is_slider = ere_search_vars.price_is_slider;


            var enable_filter_location=ere_search_vars.enable_filter_location;
            if(enable_filter_location=='1')
            {
                $('.ere-property-country-ajax', css_class_wrap).select2();
                $('.ere-property-state-ajax', css_class_wrap).select2();
                $('.ere-property-city-ajax', css_class_wrap).select2();
                $('.ere-property-neighborhood-ajax', css_class_wrap).select2();
            }

            this.full_screen();
            this.get_states_by_country();
            $(".ere-property-country-ajax", css_class_wrap).on('change', function () {
                ERE_Property_Map_Search.get_states_by_country();
            });
            this.get_cities_by_state();
            $(".ere-property-state-ajax", css_class_wrap).on('change', function () {
                ERE_Property_Map_Search.get_cities_by_state();
            });
            this.get_neighborhoods_by_city();
            $(".ere-property-city-ajax", css_class_wrap).on('change', function () {
                ERE_Property_Map_Search.get_neighborhoods_by_city();
            });
            $('.btn-status-filter', css_class_wrap).on('click', function (e) {
                e.preventDefault();
                var status = $(this).data("value");
                $(this).parent().find('input').val(status);
                $(this).parent().find('button').removeClass('active');
                $(this).addClass('active');
                ERE_Property_Map_Search.change_price_on_status_change(status);
            });
            $('select[name="status"]', css_class_wrap).on('change', function (e) {
                e.preventDefault();
                var status = $(this).val();
                ERE_Property_Map_Search.change_price_on_status_change(status);
            });
            this.execute_url_search();
            $(".ere-sliderbar-filter.ere-sliderbar-price", css_class_wrap).on('register.again', function () {
                $(".ere-sliderbar-filter.ere-sliderbar-price", css_class_wrap).each(function () {
                    var slider_filter = $(this);
                    ERE_Property_Map_Search.set_slider_filter(slider_filter);
                });
            });
            this.register_slider_filter();
            this.set_slider_value();
            $(".ere-sliderbar-filter.ere-sliderbar-price", css_class_wrap).on('register.again', function () {
                $(".ere-sliderbar-filter.ere-sliderbar-price", css_class_wrap).each(function () {
                    var slider_filter = $(this);
                    ERE_Property_Map_Search.set_slider_filter(slider_filter);
                });
            });
            $('.ere-search-status-tab .btn-status-filter', css_class_wrap).on('click', function () {
                $(this).parent().find('input').val($(this).data("value"));
                $(this).parent().find('button').removeClass('active');
                $(this).addClass('active');
            });
            $('select[name="type"],select[name="rooms"], select[name="bedrooms"],select[name="bathrooms"] , ' +
                'select[name="garage"], select[name="label"],input[name="keyword"],input[name="address"],input[name="title"],input[name="property_identity"], ' +
                'select[name="min-price"], select[name="max-price"],select[name="min-area"], select[name="max-area"],select[name="min-land-area"], select[name="min-land-area"], ' +
                'select[name="city"], select[name="country"], select[name="state"], select[name="neighborhood"], .ere-custom-search-field-select', css_class_wrap).on('change', function () {
                ERE_Property_Map_Search.search_on_change();
            });
            $('input[name="other_features"]', css_class_wrap).on('change', function () {
                ERE_Property_Map_Search.search_on_change();
            });
            ERE_Property_Map_Search.search_properties('map_only');
        },
        get_states_by_country: function () {
            var $this = $(".ere-property-country-ajax", css_class_wrap);
            if ($this.length) {
                var selected_country = $this.val();
                $.ajax({
                    type: "POST",
                    url: ajax_url,
                    data: {
                        'action': 'ere_get_states_by_country_ajax',
                        'country': selected_country,
                        'type': 1,
                        'is_slug':'1'
                    },
                    success: function (response) {
                        $(".ere-property-state-ajax", css_class_wrap).html(response);
                        var val_selected = $(".ere-property-state-ajax", css_class_wrap).attr('data-selected');
                        if (typeof val_selected !== 'undefined') {
                            $(".ere-property-state-ajax", css_class_wrap).val(val_selected);
                        }
                    }
                });
            }
        },
        get_cities_by_state: function () {
            var $this = $(".ere-property-state-ajax", css_class_wrap);
            if ($this.length) {
                var selected_state = $this.val();
                $.ajax({
                    type: "POST",
                    url: ajax_url,
                    data: {
                        'action': 'ere_get_cities_by_state_ajax',
                        'state': selected_state,
                        'type': 1
                    },
                    success: function (response) {
                        $(".ere-property-city-ajax", css_class_wrap).html(response);
                        var val_selected = $(".ere-property-city-ajax", css_class_wrap).attr('data-selected');
                       if (typeof val_selected !== 'undefined') {
                            $(".ere-property-city-ajax", css_class_wrap).val(val_selected);
                        }
                    }
                });
            }
        },
        get_neighborhoods_by_city: function () {
            var $this = $(".ere-property-city-ajax", css_class_wrap);
            if ($this.length) {
                var selected_city = $this.val();
                $.ajax({
                    type: "POST",
                    url: ajax_url,
                    data: {
                        'action': 'ere_get_neighborhoods_by_city_ajax',
                        'city': selected_city,
                        'type': 1,
                        'is_slug':'1'
                    },
                    success: function (response) {
                        $(".ere-property-neighborhood-ajax", css_class_wrap).html(response);
                        var val_selected = $(".ere-property-neighborhood-ajax", css_class_wrap).attr('data-selected');
                       if (typeof val_selected !== 'undefined') {
                            $(".ere-property-neighborhood-ajax", css_class_wrap).val(val_selected);
                        }
                    }
                });
            }
        },
        execute_url_search: function () {
            $('.ere-advanced-search-btn', css_class_wrap).on('click', function (e) {
                e.preventDefault();
                var search_form = $(this).closest('.search-properties-form'),
                    search_url = search_form.data('href'),
                    search_field = [],
                    query_string = '?';
                if (search_url.indexOf('?') !== -1) {
                    query_string = '&';
                }
                $('.search-field', search_form).each(function () {
                    var $this = $(this),
                        field_name = $this.attr('name'),
                        current_value = $this.val(),
                        default_value = $this.data('default-value');
                    if (current_value != default_value) {
                        search_field[field_name] = current_value;
                    }
                });
                $('.ere-sliderbar-filter', search_form).each(function () {
                    var $this = $(this),
                        field_name_min = $this.find('.min-input-request').attr('name'),
                        field_name_max = $this.find('.max-input-request').attr('name'),
                        current_value_min = $this.find('.min-input-request').val(),
                        current_value_max = $this.find('.max-input-request').val(),
                        default_value_min = $this.data('min-default'),
                        default_value_max = $this.data('max-default');
                    if (current_value_min != default_value_min || current_value_max != default_value_max) {
                        search_field[field_name_min] = current_value_min;
                        search_field[field_name_max] = current_value_max;
                    }
                });
                var other_features = '';
                $('[name="other_features"]', search_form).each(function () {
                    var $this = $(this),
                        value = $this.attr('value');
                    if ($this.is(':checked')) {
                        other_features += value + ";";
                    }
                });
                if (other_features !== '') {
                    other_features = other_features.substring(0, other_features.length - 1);
                    search_field['other_features'] = other_features;
                }
                if (search_field !== []) {
                    for (var k in search_field) {
                        if (search_field.hasOwnProperty(k)) {
                            query_string += k + "=" + encodeURIComponent(search_field[k]) + "&";
                        }
                    }
                }

                query_string = query_string.substring('0', query_string.length - 1);
                window.location.href = search_url + query_string;
            });
        },
        set_slider_filter: function (elm) {
            var $container = elm,
                min = parseInt($container.attr('data-min-default')),
                max = parseInt($container.attr('data-max-default')),
                min_value = $container.attr('data-min'),
                max_value = $container.attr('data-max'),
                $sidebar_filter = $container.find('.sidebar-filter'),
                min_text = '',
                max_text = '',
                x, y;
            $sidebar_filter.slider({
                min: min,
                max: max,
                range: true,
                values: [min_value, max_value],
                slide: function (event, ui) {
                    x = ui.values[0];
                    y = ui.values[1];
                    $container.attr('data-min', x);
                    $container.attr('data-max', y);
                    $container.find('input.min-input-request').attr('value', x);
                    $container.find('input.max-input-request').attr('value', y);


                    if ($container.find('span').hasClass("not-format")) {
                        min_text =  x;
                        max_text =  y;
                    } else {
                        min_text =  ERE.number_format(x);
                        max_text = ERE.number_format(y);
                    }

                    if ($container.hasClass('ere-sliderbar-price')) {
                        if (ere_main_vars.currency_position === 'before') {
                            min_text =  ere_main_vars.currency + min_text;
                            max_text = ere_main_vars.currency + max_text;
                        } else {
                            min_text = min_text +  ere_main_vars.currency;
                            max_text = max_text + ere_main_vars.currency;
                        }
                    }

                    $container.find('span.min-value').html(min_text);
                    $container.find('span.max-value').html(max_text);
                },
                stop: function (event, ui) {
                    ERE_Property_Map_Search.search_on_change();
                }
            });
        },
        register_slider_filter: function () {
            $(".ere-sliderbar-filter", css_class_wrap).each(function () {
                var slider_filter = $(this);
                ERE_Property_Map_Search.set_slider_filter(slider_filter);
            });
        },
        set_slider_value: function () {
            $('.ere-sliderbar-filter', css_class_wrap).each(function () {
                var $this = $(this),
                    min_default = $this.attr('data-min-default'),
                    max_default = $this.attr('data-max-default'),
                    min_value = $this.attr('data-min'),
                    max_value = $this.attr('data-max'),
                    left = (min_value - min_default) / (max_default - min_default) * 100 + '%',
                    width = (max_value - min_value) / (max_default - min_default) * 100 + '%',
                    left_max = (max_value - min_default) / (max_default - min_default) * 100 + '%';
                $this.find('.ui-slider-range.ui-corner-all.ui-widget-header').css({
                    'left': left,
                    'width': width
                });
                $this.find('.ui-slider-handle.ui-corner-all.ui-state-default').css('left', left);
                $this.find('.ui-slider-handle.ui-corner-all.ui-state-default:last-child').css('left', left_max);
            })
        },
        change_price_on_status_change: function (status) {
            $.ajax({
                type: 'POST',
                url: ajax_url,
                dataType: 'json',
                data: {
                    'action': 'ere_ajax_change_price_on_status_change',
                    'status': status,
                    'price_is_slider': price_is_slider
                },
                success: function (response) {
                    if (response.slide_html) {
                        $('.ere-sliderbar-price-wrap', css_class_wrap).html(response.slide_html);
                        ERE_Property_Map_Search.register_slider_filter();
                        ERE_Property_Map_Search.set_slider_value();
                    }
                    else {
                        if (response.min_price_html) {
                            $('select[name="min-price"]', css_class_wrap).html(response.min_price_html);
                        }
                        if (response.max_price_html) {
                            $('select[name="max-price"]', css_class_wrap).html(response.max_price_html);
                        }
                    }
                    ERE_Property_Map_Search.search_on_change();
                }
            });
        },
        full_screen: function () {
            if ($('.ere-search-properties-map.style-vertical').length > 0) {
                var  map_height = $(window).outerHeight();

                if ($('#wpadminbar').length > 0) {
                    map_height -= $('#wpadminbar').outerHeight();
                }

                if ($('header').length > 0) {
                    map_height -= $('header').outerHeight();
                }

                if ($('footer').length > 0) {
                    map_height -= $('footer').outerHeight();
                }


                $('.ere-search-properties-map.style-vertical .ere-map-search').css('height', map_height);
                $('.ere-search-properties-map.style-vertical .ere-map-search .ere-map-result').css('height', map_height);
                $('.col-scroll-vertical').css('height', map_height);

                var $container = $('.owl-carousel', '.list-property-result-ajax'),
                    $newElems = $('.property-item', $container);
                $container.trigger('destroy.owl.carousel');
                $container.css('opacity', 1);
                $container.imagesLoaded(function () {
                    ERE.set_item_effect($newElems, 'hide');
                    ERE_Carousel.owlCarousel();
                    $newElems = $('.property-item', $container);
                    ERE.set_item_effect($newElems, 'show');
                });
            }
        },
        search_on_change: function () {
            var search_type = 'map_only';
            if ($(".list-property-result-ajax", css_class_wrap).length > 0) {
                search_type = 'map_and_content';
            }
            ERE_Property_Map_Search.search_properties(search_type);
        },
        search_properties: function (search_type) {

            var country, city, state, neighborhood, keyword,  title, area, status, type,rooms, bedrooms, bathrooms, min_price, max_price,
                min_area, max_area, address, garage, features, label, min_land_area, max_land_area, property_identity, features_enable;
            var search_form = $(css_class_wrap);
            keyword = search_form.find('input[name="keyword"]').val();
            title = search_form.find('input[name="title"]').val();
            address = search_form.find('input[name="address"]').val();
            city = search_form.find('select[name="city"]').val();
            type = search_form.find('select[name="type"]').val();
            status = search_form.find('select[name="status"]').val();
            if (status == undefined) {
                status = search_form.find('input[name="status"]').val();
            }
            rooms = search_form.find('select[name="rooms"]').val();
            bedrooms = search_form.find('select[name="bedrooms"]').val();
            bathrooms = search_form.find('select[name="bathrooms"]').val();
            if ($('.ere-sliderbar-price', search_form).length) {
                min_price = search_form.find('.ere-sliderbar-filter.ere-sliderbar-price').attr('data-min');
                max_price = search_form.find('.ere-sliderbar-filter.ere-sliderbar-price').attr('data-max');
            }
            else {
                min_price = search_form.find('select[name="min-price"]').val();
                max_price = search_form.find('select[name="max-price"]').val();
            }


            if ($('.ere-sliderbar-area', search_form).length) {
                min_area = search_form.find('.ere-sliderbar-filter.ere-sliderbar-area').attr('data-min');
                max_area = search_form.find('.ere-sliderbar-filter.ere-sliderbar-area').attr('data-max');
            }
            else {
                min_area = search_form.find('select[name="min-area"]').val();
                max_area = search_form.find('select[name="max-area"]').val();
            }

            if ($('.ere-sliderbar-land-area', search_form).length) {
                min_land_area = search_form.find('.ere-sliderbar-filter.ere-sliderbar-land-area').attr('data-min');
                max_land_area = search_form.find('.ere-sliderbar-filter.ere-sliderbar-land-area').attr('data-max');
            }
            else {
                min_land_area = search_form.find('select[name="min-land-area"]').val();
                max_land_area = search_form.find('select[name="max-land-area"]').val();
            }

            state = search_form.find('select[name="state"]').val();
            country = search_form.find('select[name="country"]').val();
            neighborhood = search_form.find('select[name="neighborhood"]').val();
            label = search_form.find('select[name="label"]').val();
            garage = search_form.find('select[name="garage"]').val();
            property_identity = search_form.find('input[name="property_identity"]').val();

            features = '';
            $('[name="other_features"]', search_form).each(function () {
                var $this = $(this),
                    value = $this.attr('value');
                if ($this.is(':checked')) {
                    features += value + ";";
                }
            });
            if (features !== '') {
                features = features.substring(0, features.length - 1);
            }


            var ere_security_search_map = $('#ere_security_search_map').val();
            var map_id = $(search_form).find('.ere-map-result').attr('id');
            var map_result_content = $('#' + map_id);
            var marker_cluster = null,
                googlemap_default_zoom = ere_search_vars.googlemap_default_zoom,
                not_found = ere_search_vars.not_found,
                clusterIcon = ere_search_vars.clusterIcon,
                google_map_style = ere_search_vars.google_map_style,
                pin_cluster_enable = ere_search_vars.pin_cluster_enable;

            var ere_search_map_option = {
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                scroll: {x: $(window).scrollLeft(), y: $(window).scrollTop()},
                zoom: parseInt(googlemap_default_zoom),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                gestureHandling: 'cooperative',
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                }
            };



            infobox = new InfoBox({
                disableAutoPan: true, //false
                maxWidth: 310,
                alignBottom: true,
                pixelOffset: new google.maps.Size(-140, -55),
                zIndex: null,
                closeBoxMargin: "0 0 -16px -16px",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            });
            var ere_add_markers = function (props, map) {
                $.each(props, function (i, prop) {
                    var latlng = new google.maps.LatLng(prop.lat, prop.lng),
                        marker_url = prop.marker_icon,
                        marker_size = new google.maps.Size(44, 60);

                    var marker_icon = {
                        url: marker_url,
                        size: marker_size,
                        scaledSize: new google.maps.Size(44, 60),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(7, 27)
                    };

                    var finalLatLng = latlng;

                   for (var j = 0; j < markers.length; j++) {
                        var existingMarker = markers[j];
                        var pos = existingMarker.getPosition();
                        if (latlng.equals(pos)) {
                            //update the position of the coincident marker by applying a small multipler to its coordinates
                            var newLat = latlng.lat() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
                            var newLng = latlng.lng() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
                            finalLatLng = new google.maps.LatLng(newLat,newLng);
                        }
                    }

                    var marker = new google.maps.Marker({
                        position: finalLatLng,
                        map: map,
                        icon: marker_icon,
                        draggable: false,
                        animation: google.maps.Animation.DROP
                    });

                    var prop_title = prop.data ? prop.data.post_title : prop.title,
                        display_css = '';
                    if (prop.image_url == '' || typeof(prop.image_url) == 'undefined') {
                        display_css = 'style="display: none;"';
                    }

                    var contentString = document.createElement("div");
                    contentString.className = 'marker-content clearfix';
                    contentString.innerHTML = '<div class="marker-content-inner clearfix">' +
                        '<div class = "item-thumb" ' + display_css + '>' +
                        '<a href="' + prop.url + '">' +
                        '<img src="' + prop.image_url + '" alt="' + prop_title + '" style="width: 100px;">' +
                        '</a>' +
                        '</div>' +
                        '<div class="item-body">' +
                        '<a href="' + prop.url + '" class="title-marker">' + prop_title + '</a>' +
                        '<div class="price-marker">' + prop.price + '</div>' +
                        '<div class="address-marker"><i class="fa fa-map-marker"></i>' + prop.address + '</div>' +
                        '</div>' +
                        '</div>';
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            var scale = Math.pow(2, map.getZoom()),
                                offsety = ( (100 / scale) || 0 ),
                                projection = map.getProjection(),
                                markerPosition = marker.getPosition(),
                                markerScreenPosition = projection.fromLatLngToPoint(markerPosition),
                                pointHalfScreenAbove = new google.maps.Point(markerScreenPosition.x, markerScreenPosition.y - offsety),
                                aboveMarkerLatLng = projection.fromPointToLatLng(pointHalfScreenAbove);
                            map.setCenter(aboveMarkerLatLng);
                            setTimeout(function () {
                                infobox.setContent(contentString);
                                infobox.open(map, marker);
                            }, 300)
                        }
                    })(marker, i));
                    markers.push(marker);
                });
            };

            var _data =  {
                'action': 'ere_property_search_ajax',
                'keyword' : keyword,
                'title': title,
                'address': address,
                'country': country,
                'state': state,
                'city': city,
                'neighborhood': neighborhood,
                'type': type,
                'status': status,
                'rooms': rooms,
                'bedrooms': bedrooms,
                'bathrooms': bathrooms,
                'min_price': min_price,
                'max_price': max_price,
                'min_area': min_area,
                'max_area': max_area,
                'label': label,
                'garage': garage,
                'min_land_area': min_land_area,
                'max_land_area': max_land_area,
                'property_identity': property_identity,
                'features': features,
                'search_type': search_type,
                'ere_security_search_map': ere_security_search_map
            };

            $('.ere-custom-search-field',search_form).each(function () {
                _data[$(this).attr('name')] = $(this).val();

            });

            $.ajax({
                dataType: 'json',
                url: ajax_url,
                data: _data,
                beforeSend: function () {
                    map_result_content.parents('div.ere-search-properties-map').find('#ere-map-loading').fadeIn();
                },
                success: function (data) {
                    if (search_type == 'map_and_content') {
                        var $container = $('.owl-carousel', '.list-property-result-ajax'),
                            $wrap = $('.list-property-result-ajax');
                        $container.empty();
                        if (data.success === false) {
                            $wrap.find('.title-result h2 .number-result').hide();
                            $wrap.find('.title-result h2 .text-no-result').show();
                            $wrap.find('.title-result h2 .text-result').hide();
                        } else {
                            var $newElems = $('.property-item', data.property_html);
                            $container.css('opacity', 0);
                            $container.trigger('destroy.owl.carousel');
                            $container.html($newElems);
                            $container.css('opacity', 1);
                            $container.imagesLoaded(function () {
                                ERE.set_item_effect($newElems, 'hide');
                                ERE_Carousel.owlCarousel();
                                $newElems = $('.property-item', $container);
                                ERE.set_item_effect($newElems, 'show');
                            });
                            if ($newElems.length != '0') {
                                $wrap.find('.title-result h2 .number-result').html($newElems.length);
                                $wrap.find('.title-result h2 .number-result').show();
                                $wrap.find('.title-result h2 .text-no-result').hide();
                                $wrap.find('.title-result h2 .text-result').show();
                            }
                        }
                        ERE.favorite();
                        ERE.tooltip();
                        ERE_Compare.register_event_compare();
                    }
                    ere_map = new google.maps.Map(document.getElementById(map_id), ere_search_map_option);
                    google.maps.event.trigger(ere_map, 'resize');
                    if (data.success === true) {
                        if (data.properties) {
                            var count_properties = data.properties.length;
                        }
                    }
                    if (count_properties == 1) {
                        var boundsListener = google.maps.event.addListener((ere_map), 'bounds_changed', function (event) {
                            this.setZoom(parseInt(googlemap_default_zoom));
                            google.maps.event.removeListener(boundsListener);
                        });
                    }
                    if (google_map_style !== '') {
                        var styles = JSON.parse(google_map_style);
                        ere_map.setOptions({styles: styles});
                    }
                    var mapPosition = new google.maps.LatLng('', '');
                    ere_map.setCenter(mapPosition);
                    ere_map.setZoom(parseInt(googlemap_default_zoom));
                    google.maps.event.addListener(ere_map, 'tilesloaded', function () {
                        $('#ere-map-loading').fadeOut();
                    });
                    if (data.success === true) {
                        for (var i = 0; i < markers.length; i++) {
                            markers[i].setMap(null);
                        }
                        markers = [];
                        ere_add_markers(data.properties, ere_map);
                        ere_map.fitBounds(markers.reduce(function (bounds, marker) {
                            return bounds.extend(marker.getPosition());
                        }, new google.maps.LatLngBounds()));

                        google.maps.event.trigger(ere_map, 'resize');
                        if (pin_cluster_enable == '1') {
                            marker_cluster = new MarkerClusterer(ere_map, markers, {
                                gridSize: 60,
                                maxZoom: 18,
                                styles: [
                                    {
                                        url: clusterIcon,
                                        width: 48,
                                        height: 48,
                                        textColor: "#fff"
                                    }
                                ]
                            });
                        }
                        if(!is_mobile)
                        {
                            ere_infobox_trigger();
                        }
                    } else {
                        map_result_content.empty().html('<div class="map-notfound">' + not_found + '</div>');
                    }
                    map_result_content.closest('div.ere-search-properties-map').find('#ere-map-loading').fadeOut('slow');
                },
                error: function () {
                    map_result_content.closest('div.ere-search-properties-map').find('#ere-map-loading').fadeOut('slow');
                }
            });
        }
    };
    var ere_infobox_trigger = function() {
        $('.property-item',css_class_wrap).each(function(i) {
            $(this).on('mouseenter', function() {
                if(ere_map) {
                    google.maps.event.trigger(markers[i], 'click');
                }
            });
            $(this).on('mouseleave', function() {
                infobox.open(null,null);
            });
        });
        return false;
    };
    $(document).ready(function () {
        if (!$('body').hasClass('elementor-editor-active')) {
            ERE_Property_Map_Search.init();
        }
    });
    $(window).resize(function () {
        ERE_Property_Map_Search.full_screen();
    });
    $(window).on('orientationchange', function () {
        ERE_Property_Map_Search.full_screen();
    });
})(jQuery);