SELECT
  incidents.id,
  incidents.us_state,
  injuries.name as injuries_name,
  affected_areas.name as affected_areas_name,
  causes.name as causes_name
FROM incidents
JOIN injuries ON incidents.injury_id = injuries.id
JOIN causes ON incidents.cause_id = causes.id
JOIN affected_areas ON injuries.affected_area_id = affected_areas.id
WHERE causes.name = $1;
