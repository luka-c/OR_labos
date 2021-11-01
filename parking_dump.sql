--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: parking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking (
    id integer NOT NULL,
    imeparkinga character varying(40) NOT NULL,
    brojmjesta integer NOT NULL,
    brojinvalidskihmjesta integer NOT NULL,
    vrsta character varying(15) NOT NULL,
    zona character varying(20) NOT NULL,
    "županija" character varying(40) NOT NULL,
    grad character varying(40) NOT NULL,
    kvart character varying(40) NOT NULL,
    ulica character varying(40) NOT NULL,
    "kućnibroj" character varying(6),
    CONSTRAINT ispravnavrsta CHECK (((vrsta)::text = ANY ((ARRAY['automobilski'::character varying, 'autobusni'::character varying, 'kamionski'::character varying, 'biciklistički'::character varying, 'mješoviti'::character varying])::text[])))
);


ALTER TABLE public.parking OWNER TO postgres;

--
-- Name: zona; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zona (
    zona character varying(20) NOT NULL,
    dnevnakarta double precision NOT NULL,
    pozivnibroj integer
);


ALTER TABLE public.zona OWNER TO postgres;

--
-- Data for Name: parking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking (id, imeparkinga, brojmjesta, brojinvalidskihmjesta, vrsta, zona, "županija", grad, kvart, ulica, "kućnibroj") FROM stdin;
1	Importanne	50	5	automobilski	II.1. zona	Grad Zagreb	Zagreb	Donji Grad	Trg Ante Starčevića	7
2	Glavni kolodvor	30	4	automobilski	II.3. zona	Grad Zagreb	Zagreb	Donji Grad	Trg Stjepana Radića	\N
3	S.D. Martinovka	70	14	automobilski	II.1. zona	Grad Zagreb	Zagreb	Donji Grad	Zelinska ulica	\N
4	Parkiralište Paromlin	180	22	automobilski	II.1. zona	Grad Zagreb	Zagreb	Donji Grad	Koturaška ulica	1A
5	Parking IV. zone	45	9	automobilski	IV.1. zona	Grad Zagreb	Zagreb	Donji Grad	Strojarska ulica	20
6	Parking Strojarska	60	12	automobilski	II.1. zona	Grad Zagreb	Zagreb	Donji Grad	Strojarska cesta	\N
7	Parking Supermarket	120	10	automobilski	Besplatna	Grad Zagreb	Zagreb	Kruge	Trnjanska cesta	42
8	FER parking za bicikle	90	0	biciklistički	Besplatna	Grad Zagreb	Zagreb	Donji Grad	Unska ulica	3
9	Parking Arena Zagreb	300	40	automobilski	Besplatna	Grad Zagreb	Zagreb	Lanište	Ul. Vice Vukova	6
10	Sigurno arkiralište	100	8	kamionski	IV.1. zona	Grad Zagreb	Zagreb	Jankomir	Jankomir	25
\.


--
-- Data for Name: zona; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zona (zona, dnevnakarta, pozivnibroj) FROM stdin;
I. zona	100	700101
I. zona 1/2 h	100	700101
I.1. zona	150	700101
I.2. zona	120	700101
II.1. zona	60	700102
II.3. zona	60	700102
III. zona	20	700103
IV.1. zona	30	700104
IV.2. zona	30	700104
Besplatna	0	\N
\.


--
-- Name: parking parking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking
    ADD CONSTRAINT parking_pkey PRIMARY KEY (id);


--
-- Name: zona zona_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zona
    ADD CONSTRAINT zona_pkey PRIMARY KEY (zona);


--
-- Name: parking parking_zona_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking
    ADD CONSTRAINT parking_zona_fkey FOREIGN KEY (zona) REFERENCES public.zona(zona);


--
-- PostgreSQL database dump complete
--

