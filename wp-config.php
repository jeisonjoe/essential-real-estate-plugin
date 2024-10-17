<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'moveinone' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'y]r#L?*)2>IeD4S1SYilFi^;MFF*t%:nW6YTHs+Gpyttf5iJKKM|v_:|~4TJ}frM' );
define( 'SECURE_AUTH_KEY',  'x WuH9HUWQwaHa06jhK5B2e3{zP[@HkR2gn:FfPO><~_Qm2G&q;D%%3Q%;Azsl8X' );
define( 'LOGGED_IN_KEY',    '5w/%qw@{28QzX#3;c9)(a,)Wvjr5XG% Ke1:uLZ|J2/!kijE.tsW/CM}s;<uSL9Z' );
define( 'NONCE_KEY',        'G3e<#4oe~UVHN0}H09^8`7r~(XZR2vwk~$fJ~`xM<,bA#IT>((6hp~+$[,V2ndwQ' );
define( 'AUTH_SALT',        'Jy%O7HKw&Im5y=M%( x}9REmIp6sl*S>KK2P{3FuH=_J>3UW4:}SUEokmK3@6h84' );
define( 'SECURE_AUTH_SALT', 'ZF,s=Z{o;A7CpJT`FP,<L 2PrH>pQ(Y&PK.aY/3dJ*=65z@sbN2agwPx_QO`wTBT' );
define( 'LOGGED_IN_SALT',   '{<Kda2)^u4wPY^v>y7o2X06G+kM9G9Enn0$r-N kPY5aF-=0,Y@9*~jQ_INl|<[.' );
define( 'NONCE_SALT',       ' |R@=?~hJiV~{@+16((vS[<t5I6nDAdO<xO%YHr(Tx4Pf&quz*Sg{{h~EO2O=rM5' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
