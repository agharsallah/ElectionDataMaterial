module.exports = {

	//'apiUrl':'http://inscription.tunisieelection.org:8080',	
	'apiUrl':'http://localhost:3000',
	'initShape':{
		'type': 'FeatureCollection',
		'crs': { 'type': 'name', 'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
		'features': [
		{ 'type': 'Feature', 'properties': { 'id': '5', 'name_en': 'hammem lif', 'citizens': '42518', 'seats': '24', 'circ': 'BenArous', 'etat': 'old', 'name_ar': 'حمام الأنف', 'area': '11.34' }, 'geometry': { 'type': 'Polygon', 'coordinates': [ [ [ 10.338760352941174, 36.708834982276791 ], [ 10.331896746698833, 36.711043423757637 ], [ 10.325737787035919, 36.710699594739438 ], [ 10.309714325625224, 36.714542500000313 ], [ 10.305080998087695, 36.713540287166602 ], [ 10.30675004477612, 36.721039361574626 ], [ 10.313381460381311, 36.727225144109262 ], [ 10.319928100930763, 36.735789537864861 ], [ 10.323475343795335, 36.7423776647803 ], [ 10.336989225145677, 36.73316191856982 ], [ 10.353094868783687, 36.726628161214826 ], [ 10.354432800889834, 36.715799798905422 ], [ 10.350753483822611, 36.711896250039878 ], [ 10.343593802802692, 36.706693421733249 ], [ 10.338557957167945, 36.709322976332949 ], [ 10.338760352941174, 36.708834982276791 ] ] ] } }
		]
		},
		'Manouba':[36.8,9.84],
		'Beja':[36.9,9.29],
		'Ben Arous':[36.65,10.23],
		'Gabes':[33.8,9.7],
		'Gafsa':[34.5,8.8],
		'Jendouba':[36.7,8.7],
		'Kairouan':[35.6,9.9],
		'Kasserine':[35.3,8.8],
		'Kebili':[33.4,8.9],
		'Le Kef':[36.1,8.7],
		'Medenine':[33.3,11.1],
		'Mahdia':[35.6,10.7],
		'Tataouine':[32.06,10.02],
		'Tozeur':[34,7.94],
		'Zaghouan':[36.3,10.0],
		'Monastir':[35.4,10.7],
		'Sidi Bouzid':[34.86,9.54],
		'Siliana':[36.1,9.35],
		'Sousse':[35.92,10.4],
		'Ariana':[36.96,10.13],
		'Bizerte':[37,9.6],
		'Nabeul':[36.67,10.71],
		'Tunis':[36.8,10.13],
		'Sfax':[34.82,10.41],
};