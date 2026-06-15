-- Create sequences for integer ID tables
CREATE SEQUENCE IF NOT EXISTS perfil_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS curso_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS disciplina_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS campus_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS local_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS inscricao_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS auditoria_id_seq START 1 INCREMENT 1;

-- Set columns to use sequences
ALTER TABLE public.perfil ALTER COLUMN id SET DEFAULT nextval('perfil_id_seq');
ALTER TABLE public.curso ALTER COLUMN id SET DEFAULT nextval('curso_id_seq');
ALTER TABLE public.disciplina ALTER COLUMN id SET DEFAULT nextval('disciplina_id_seq');
ALTER TABLE public.campus ALTER COLUMN id SET DEFAULT nextval('campus_id_seq');
ALTER TABLE public.local ALTER COLUMN id SET DEFAULT nextval('local_id_seq');
ALTER TABLE public.inscricao ALTER COLUMN id SET DEFAULT nextval('inscricao_id_seq');
ALTER TABLE public.auditoria ALTER COLUMN id SET DEFAULT nextval('auditoria_id_seq');

-- Adjust sequence values to avoid conflicts with existing data
SELECT setval('perfil_id_seq', COALESCE((SELECT MAX(id) FROM public.perfil), 0) + 1);
SELECT setval('curso_id_seq', COALESCE((SELECT MAX(id) FROM public.curso), 0) + 1);
SELECT setval('disciplina_id_seq', COALESCE((SELECT MAX(id) FROM public.disciplina), 0) + 1);
SELECT setval('campus_id_seq', COALESCE((SELECT MAX(id) FROM public.campus), 0) + 1);
SELECT setval('local_id_seq', COALESCE((SELECT MAX(id) FROM public.local), 0) + 1);
SELECT setval('inscricao_id_seq', COALESCE((SELECT MAX(id) FROM public.inscricao), 0) + 1);
SELECT setval('auditoria_id_seq', COALESCE((SELECT MAX(id) FROM public.auditoria), 0) + 1);
