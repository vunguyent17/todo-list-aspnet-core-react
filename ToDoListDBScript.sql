PGDMP          '                {            ToDoList    15.3    15.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17496    ToDoList    DATABASE     �   CREATE DATABASE "ToDoList" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "ToDoList";
                postgres    false            �            1259    17500    todos    TABLE     �   CREATE TABLE public.todos (
    id character varying(50) NOT NULL,
    title character varying(500) NOT NULL,
    content character varying(1000),
    is_done boolean,
    modified_at timestamp with time zone,
    created_at timestamp with time zone
);
    DROP TABLE public.todos;
       public         heap    postgres    false            �          0    17500    todos 
   TABLE DATA           U   COPY public.todos (id, title, content, is_done, modified_at, created_at) FROM stdin;
    public          postgres    false    214   �       e           2606    17506    todos todo_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.todos DROP CONSTRAINT todo_pkey;
       public            postgres    false    214            �   �  x�}��n1�ϛ�N=�W�{o4H�8PD
\��^o�����n�>.���Q��H�Fk���1CTޱ@(U��%1�~`�x���St;��G��w�n��X��=|��>���dx��O�篯��@��5CÐq�� �:��0-^_y���Օ�#�'*�AK���8E�@+��Dv��v�	n���|(���Js'��Prn���B٥|e�_���`H`����5�琦c�C�"Wܪ$���S��!���PDr���7��4��q�d�t�C\r��C��f��i_Jna����.�-<WX�xGe��E�4��N�^����Zk�
�2L�@Lt�y�tUh�QL��t͛��u�Sܟ���2/����u�aL9��~~���t��38-����V�uܴ�Z��ꔧ�J�HxO�)1�i2��{+j��8�����>�mݷ�2ex_s�Ma[��x�&Nu�w�~�O��l�U�<�T�L�s���(�1{\�/�j���!�4     