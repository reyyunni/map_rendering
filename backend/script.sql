DROP TABLE if EXISTS 'shapes';

CREATE TABLE IF NOT EXISTS shapes (
    polygon_name TEXT NOT NULL PRIMARY KEY,
    coordinates TEXT
);

INSERT INTO shapes (polygon_name, coordinates) VALUES ('p1', 
    '{"coordinates": [
        { lat: 25.774, lng: -60.19 },
        { lat: 18.466, lng: -46.118 },
        { lat: 32.321, lng: -44.757 },
    ]}'
),
('p2',
    '{"coordinates": [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 },
    ]}'
),
('p3',
    '{"coordinates": [
        { lat: 50.268, lng: -128.588 },
        { lat: 55.360, lng: -172.914 },
        { lat: 36.571, lng: -172.914 },
        { lat: 38.246, lng: -128.588 },
    ]}'
);

