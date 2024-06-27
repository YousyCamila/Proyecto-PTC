--   en:        2024-06-16 21:53:01 COT
--   sitio:      SQL Server 2012
--   tipo:      SQL Server 2012



CREATE TABLE ADMINISTRADOR 
    (
     DNI NVARCHAR (16) NOT NULL 
    )
GO

ALTER TABLE ADMINISTRADOR ADD CONSTRAINT ADMINISTRADOR_PK PRIMARY KEY CLUSTERED (DNI)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Auditoria 
    (
     ID_Auditoria INTEGER NOT NULL , 
     Fecha_Actividad NVARCHAR (128) NOT NULL , 
     Descrip_Actividad NVARCHAR (128) NOT NULL , 
     Estado NVARCHAR (128) NOT NULL , 
     Hora_Activ NVARCHAR (128) NOT NULL , 
     Detalles_Adicionales NVARCHAR (256) NOT NULL , 
     USUARIO_USUARIO_ID NUMERIC (28) NOT NULL 
    )
GO 

    


CREATE UNIQUE NONCLUSTERED INDEX 
    Auditoria__IDX ON Auditoria 
    ( 
     USUARIO_USUARIO_ID 
    ) 
GO

ALTER TABLE Auditoria ADD CONSTRAINT Auditoria_PK PRIMARY KEY CLUSTERED (ID_Auditoria)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE CASOS 
    (
     ID INTEGER NOT NULL , 
     FechaApertura DATE NOT NULL , 
     FechaCierre DATE , 
     Descripcion NVARCHAR (256) NOT NULL , 
     CLIENTE_DNI NVARCHAR (16) NOT NULL , 
     CASOS_ID NUMERIC (28) NOT NULL IDENTITY NOT FOR REPLICATION 
    )
GO

ALTER TABLE CASOS ADD CONSTRAINT CASOS_ID_UN PRIMARY KEY CLUSTERED (ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO
ALTER TABLE CASOS ADD CONSTRAINT CASOS_PK UNIQUE NONCLUSTERED (CASOS_ID)
GO

CREATE TABLE CLIENTE 
    (
     DNI NVARCHAR (16) NOT NULL , 
     Direccion NVARCHAR NOT NULL , 
     Formulario_ID_Formulario INTEGER NOT NULL , 
     Contrato_ID_Contrato NVARCHAR (128) NOT NULL 
    )
GO 

    


CREATE UNIQUE NONCLUSTERED INDEX 
    CLIENTE__IDX ON CLIENTE 
    ( 
     Contrato_ID_Contrato 
    ) 
GO 


CREATE UNIQUE NONCLUSTERED INDEX 
    CLIENTE__IDXv1 ON CLIENTE 
    ( 
     Formulario_ID_Formulario 
    ) 
GO

ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE_PK PRIMARY KEY CLUSTERED (DNI)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Contrato 
    (
     ID_Contrato NVARCHAR (128) NOT NULL , 
     Descrip_Servicio NVARCHAR (128) NOT NULL , 
     Fecha_Inicia NVARCHAR (128) NOT NULL , 
     Fecha_Cierre NVARCHAR (128) NOT NULL , 
     Clausulas NVARCHAR (128) NOT NULL , 
     Tarifa INTEGER NOT NULL , 
     Estado NVARCHAR (128) NOT NULL , 
     INVESTIGADOR_DNI NVARCHAR (16) NOT NULL 
    )
GO 

    


CREATE UNIQUE NONCLUSTERED INDEX 
    Contrato__IDX ON Contrato 
    ( 
     INVESTIGADOR_DNI 
    ) 
GO

ALTER TABLE Contrato ADD CONSTRAINT Contrato_PK PRIMARY KEY CLUSTERED (ID_Contrato)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Evidencia 
    (
     ID_Evidencia INTEGER NOT NULL , 
     fecha_Evidencia INTEGER NOT NULL , 
     Descripcion NVARCHAR (250) NOT NULL , 
     Historial_de_casos_ID_historial INTEGER NOT NULL 
    )
GO

ALTER TABLE Evidencia ADD CONSTRAINT Evidencia_PK PRIMARY KEY CLUSTERED (ID_Evidencia)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Evidencias_Caso 
    (
     EvidenciaID INTEGER NOT NULL , 
     FechaEvidencia DATE NOT NULL , 
     TipoEvidencia INTEGER , 
     Evidencia BINARY , 
     TipoAportante INTEGER , 
     CASOS_CASOS_ID NUMERIC (28) NOT NULL , 
     TipoEvidencia_TipoEvidenciaId INTEGER NOT NULL , 
     TipoAportante_TipoAportante INTEGER NOT NULL , 
     Descripcion NVARCHAR (256) NOT NULL , 
     Reporte_ID_Reporte INTEGER NOT NULL 
    )
GO 

    


CREATE UNIQUE NONCLUSTERED INDEX 
    Evidencias_Caso__IDX ON Evidencias_Caso 
    ( 
     Reporte_ID_Reporte 
    ) 
GO

ALTER TABLE Evidencias_Caso ADD CONSTRAINT Evidencias_Caso_PK PRIMARY KEY CLUSTERED (EvidenciaID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Factura 
    (
     ID_Factura INTEGER NOT NULL , 
     Fecha_Emision NVARCHAR (256) NOT NULL , 
     Estado_Pago NVARCHAR (256) NOT NULL , 
     Descripcion_Serv NVARCHAR (128) NOT NULL , 
     Total_Pagar NVARCHAR (128) NOT NULL , 
     CASOS_CASOS_ID NUMERIC (28) NOT NULL , 
     ID INTEGER NOT NULL 
    )
GO 

    


CREATE UNIQUE NONCLUSTERED INDEX 
    Factura__IDX ON Factura 
    ( 
     CASOS_CASOS_ID 
    ) 
GO 


CREATE UNIQUE NONCLUSTERED INDEX 
    Factura__IDXv1 ON Factura 
    ( 
     ID 
    ) 
GO

ALTER TABLE Factura ADD CONSTRAINT Factura_PK PRIMARY KEY CLUSTERED (ID_Factura)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Formulario 
    (
     ID_Formulario INTEGER NOT NULL , 
     Nombre NVARCHAR (128) NOT NULL , 
     Nume_Celular NVARCHAR (128) NOT NULL , 
     Descripcion NVARCHAR (256) NOT NULL , 
     Fecha_Envio NVARCHAR (128) NOT NULL 
    )
GO

ALTER TABLE Formulario ADD CONSTRAINT Formulario_PK PRIMARY KEY CLUSTERED (ID_Formulario)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Historial 
    (
     ID_Historial NVARCHAR (128) NOT NULL , 
     Descripcion NVARCHAR (128) NOT NULL , 
     Fecha_Inicio_Histo NVARCHAR (128) NOT NULL , 
     Fecha_Finali_Histo NVARCHAR (!28) NOT NULL , 
     CLIENTE_DNI NVARCHAR (16) NOT NULL 
    )
GO 

    


CREATE UNIQUE NONCLUSTERED INDEX 
    Historial__IDX ON Historial 
    ( 
     CLIENTE_DNI 
    ) 
GO

ALTER TABLE Historial ADD CONSTRAINT Historial_PK PRIMARY KEY CLUSTERED (ID_Historial)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Historial_de_casos 
    (
     ID_historial INTEGER NOT NULL , 
     Descripcion NVARCHAR (258) NOT NULL , 
     Fecha_Incio INTEGER NOT NULL , 
     fecha_finalizacion INTEGER NOT NULL , 
     CASOS_ID INTEGER NOT NULL 
    )
GO

ALTER TABLE Historial_de_casos ADD CONSTRAINT Historial_de_casos_PK PRIMARY KEY CLUSTERED (ID_historial)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE INVESTIGADOR 
    (
     DNI NVARCHAR (16) NOT NULL , 
     Especialidad NVARCHAR 
    )
GO

ALTER TABLE INVESTIGADOR ADD CONSTRAINT INVESTIGADOR_PK PRIMARY KEY CLUSTERED (DNI)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE PERSONA 
    (
     DNI NVARCHAR (16) NOT NULL , 
     Nombres NVARCHAR (256) NOT NULL , 
     Apellidos NVARCHAR (256) NOT NULL , 
     Correo NVARCHAR (256) NOT NULL , 
     Fecha_Nacimiento NVARCHAR (100) 
    )
GO

ALTER TABLE PERSONA ADD CONSTRAINT PERSONA_PK PRIMARY KEY CLUSTERED (DNI)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Registro_Mantenimineto 
    (
     ID_Mantenimiento INTEGER NOT NULL , 
     Descripcion NVARCHAR (128) NOT NULL , 
     Fecha_Inicio NVARCHAR (128) NOT NULL , 
     Fecha_Final NVARCHAR (128) NOT NULL , 
     Estado NVARCHAR (128) NOT NULL , 
     ADMINISTRADOR_DNI NVARCHAR (16) NOT NULL 
    )
GO 

    


CREATE UNIQUE NONCLUSTERED INDEX 
    Registro_Mantenimineto__IDX ON Registro_Mantenimineto 
    ( 
     ADMINISTRADOR_DNI 
    ) 
GO

ALTER TABLE Registro_Mantenimineto ADD CONSTRAINT Registro_Mantenimineto_PK PRIMARY KEY CLUSTERED (ID_Mantenimiento)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Relation_8 
    (
     INVESTIGADOR_DNI NVARCHAR (16) NOT NULL , 
     CASOS_CASOS_ID NUMERIC (28) NOT NULL , 
     CASOS_ID INTEGER NOT NULL 
    )
GO

ALTER TABLE Relation_8 ADD CONSTRAINT Relation_8_PK PRIMARY KEY CLUSTERED (INVESTIGADOR_DNI, CASOS_CASOS_ID, CASOS_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Reporte 
    (
     ID_Reporte INTEGER NOT NULL , 
     Fecha_Creacion NVARCHAR (128) NOT NULL , 
     Estado_Reporte NVARCHAR (128) NOT NULL , 
     Descripcion NVARCHAR (128) NOT NULL , 
     CASOS_CASOS_ID NUMERIC (28) NOT NULL , 
     ID INTEGER NOT NULL 
    )
GO

ALTER TABLE Reporte ADD CONSTRAINT Reporte_PK PRIMARY KEY CLUSTERED (ID_Reporte)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE reportev1 
    (
     ID_Reporte INTEGER NOT NULL , 
     Fecha_creacion1 INTEGER NOT NULL , 
     Estado_Reporte NVARCHAR (250) NOT NULL , 
     Descripcion_Reporte NVARCHAR (250) NOT NULL 
    )
GO

ALTER TABLE reportev1 ADD CONSTRAINT reportev1_PK PRIMARY KEY CLUSTERED (ID_Reporte)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE ROLES 
    (
     RolId INTEGER NOT NULL , 
     Nombre NVARCHAR (128) , 
     Estado BIT NOT NULL 
    )
GO

ALTER TABLE ROLES ADD CONSTRAINT ROLES_PK PRIMARY KEY CLUSTERED (RolId)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE roles_usuarios 
    (
     ROLES_RolId INTEGER NOT NULL , 
     USUARIO_USUARIO_ID NUMERIC (28) NOT NULL , 
     FI DATE , 
     FF DATE 
    )
GO

ALTER TABLE roles_usuarios ADD CONSTRAINT roles_usuarios_PK PRIMARY KEY CLUSTERED (ROLES_RolId, USUARIO_USUARIO_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Tipo_Aportante 
    (
     ID_Tipo_Aportante INTEGER NOT NULL , 
     Detective NVARCHAR (128) NOT NULL , 
     Cliente NVARCHAR (128) NOT NULL , 
     Tipo_Evidencia_ID_Tipo_Evidencia INTEGER NOT NULL , 
     Tipo_Evidencia_Evidencia_ID_Evidencia INTEGER NOT NULL , 
     reportev1_ID_Reporte INTEGER NOT NULL 
    )
GO

ALTER TABLE Tipo_Aportante ADD CONSTRAINT Tipo_Aportante_PK PRIMARY KEY CLUSTERED (ID_Tipo_Aportante, Tipo_Evidencia_ID_Tipo_Evidencia, Tipo_Evidencia_Evidencia_ID_Evidencia, reportev1_ID_Reporte)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Tipo_Evidencia 
    (
     ID_Tipo_Evidencia INTEGER NOT NULL , 
     Detective NVARCHAR (250) NOT NULL , 
     Cliente NVARCHAR NOT NULL , 
     Evidencia_ID_Evidencia INTEGER NOT NULL 
    )
GO

ALTER TABLE Tipo_Evidencia ADD CONSTRAINT Tipo_Evidencia_PK PRIMARY KEY CLUSTERED (ID_Tipo_Evidencia, Evidencia_ID_Evidencia)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE TipoAportante 
    (
     TipoAportante INTEGER NOT NULL , 
     Nombre NVARCHAR (256) 
    )
GO

ALTER TABLE TipoAportante ADD CONSTRAINT TipoAportante_PK PRIMARY KEY CLUSTERED (TipoAportante)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE TipoEvidencia 
    (
     TipoEvidenciaId INTEGER NOT NULL , 
     Nombre NVARCHAR (256) 
    )
GO

ALTER TABLE TipoEvidencia ADD CONSTRAINT TipoEvidencia_PK PRIMARY KEY CLUSTERED (TipoEvidenciaId)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE USUARIO 
    (
     Username NVARCHAR (128) NOT NULL , 
     Email NVARCHAR (128) NOT NULL , 
     Telefono NVARCHAR (16) NOT NULL , 
     Password NVARCHAR (64) NOT NULL , 
     PERSONA_DNI NVARCHAR (16) NOT NULL , 
     USUARIO_ID NUMERIC (28) NOT NULL IDENTITY NOT FOR REPLICATION 
    )
GO 

    


CREATE UNIQUE NONCLUSTERED INDEX 
    USUARIO__IDX ON USUARIO 
    ( 
     PERSONA_DNI 
    ) 
GO

ALTER TABLE USUARIO ADD CONSTRAINT USUARIO_PK PRIMARY KEY CLUSTERED (USUARIO_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

ALTER TABLE ADMINISTRADOR 
    ADD CONSTRAINT ADMINISTRADOR_PERSONA_FK FOREIGN KEY 
    ( 
     DNI
    ) 
    REFERENCES PERSONA 
    ( 
     DNI 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Auditoria 
    ADD CONSTRAINT Auditoria_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_USUARIO_ID
    ) 
    REFERENCES USUARIO 
    ( 
     USUARIO_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE CASOS 
    ADD CONSTRAINT CASOS_CLIENTE_FK FOREIGN KEY 
    ( 
     CLIENTE_DNI
    ) 
    REFERENCES CLIENTE 
    ( 
     DNI 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE CLIENTE 
    ADD CONSTRAINT CLIENTE_Contrato_FK FOREIGN KEY 
    ( 
     Contrato_ID_Contrato
    ) 
    REFERENCES Contrato 
    ( 
     ID_Contrato 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE CLIENTE 
    ADD CONSTRAINT CLIENTE_Formulario_FK FOREIGN KEY 
    ( 
     Formulario_ID_Formulario
    ) 
    REFERENCES Formulario 
    ( 
     ID_Formulario 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE CLIENTE 
    ADD CONSTRAINT CLIENTE_PERSONA_FK FOREIGN KEY 
    ( 
     DNI
    ) 
    REFERENCES PERSONA 
    ( 
     DNI 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Contrato 
    ADD CONSTRAINT Contrato_INVESTIGADOR_FK FOREIGN KEY 
    ( 
     INVESTIGADOR_DNI
    ) 
    REFERENCES INVESTIGADOR 
    ( 
     DNI 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Evidencia 
    ADD CONSTRAINT Evidencia_Historial_de_casos_FK FOREIGN KEY 
    ( 
     Historial_de_casos_ID_historial
    ) 
    REFERENCES Historial_de_casos 
    ( 
     ID_historial 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Evidencias_Caso 
    ADD CONSTRAINT Evidencias_Caso_CASOS_FK FOREIGN KEY 
    ( 
     CASOS_CASOS_ID
    ) 
    REFERENCES CASOS 
    ( 
     CASOS_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Evidencias_Caso 
    ADD CONSTRAINT Evidencias_Caso_Reporte_FK FOREIGN KEY 
    ( 
     Reporte_ID_Reporte
    ) 
    REFERENCES Reporte 
    ( 
     ID_Reporte 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Evidencias_Caso 
    ADD CONSTRAINT Evidencias_Caso_TipoAportante_FK FOREIGN KEY 
    ( 
     TipoAportante_TipoAportante
    ) 
    REFERENCES TipoAportante 
    ( 
     TipoAportante 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Evidencias_Caso 
    ADD CONSTRAINT Evidencias_Caso_TipoEvidencia_FK FOREIGN KEY 
    ( 
     TipoEvidencia_TipoEvidenciaId
    ) 
    REFERENCES TipoEvidencia 
    ( 
     TipoEvidenciaId 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Factura 
    ADD CONSTRAINT Factura_CASOS_FK FOREIGN KEY 
    ( 
     ID
    ) 
    REFERENCES CASOS 
    ( 
     CASOS_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Historial 
    ADD CONSTRAINT Historial_CLIENTE_FK FOREIGN KEY 
    ( 
     CLIENTE_DNI
    ) 
    REFERENCES CLIENTE 
    ( 
     DNI 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Historial_de_casos 
    ADD CONSTRAINT Historial_de_casos_CASOS_FK FOREIGN KEY 
    ( 
     CASOS_ID
    ) 
    REFERENCES CASOS 
    ( 
     ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE INVESTIGADOR 
    ADD CONSTRAINT INVESTIGADOR_PERSONA_FK FOREIGN KEY 
    ( 
     DNI
    ) 
    REFERENCES PERSONA 
    ( 
     DNI 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Registro_Mantenimineto 
    ADD CONSTRAINT Registro_Mantenimineto_ADMINISTRADOR_FK FOREIGN KEY 
    ( 
     ADMINISTRADOR_DNI
    ) 
    REFERENCES ADMINISTRADOR 
    ( 
     DNI 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Relation_8 
    ADD CONSTRAINT Relation_8_CASOS_FK FOREIGN KEY 
    ( 
     CASOS_CASOS_ID
    ) 
    REFERENCES CASOS 
    ( 
     CASOS_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Relation_8 
    ADD CONSTRAINT Relation_8_CASOS_FKv1 FOREIGN KEY 
    ( 
     CASOS_ID
    ) 
    REFERENCES CASOS 
    ( 
     ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Relation_8 
    ADD CONSTRAINT Relation_8_INVESTIGADOR_FK FOREIGN KEY 
    ( 
     INVESTIGADOR_DNI
    ) 
    REFERENCES INVESTIGADOR 
    ( 
     DNI 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Reporte 
    ADD CONSTRAINT Reporte_CASOS_FK FOREIGN KEY 
    ( 
     ID
    ) 
    REFERENCES CASOS 
    ( 
     CASOS_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE roles_usuarios 
    ADD CONSTRAINT roles_usuarios_ROLES_FK FOREIGN KEY 
    ( 
     ROLES_RolId
    ) 
    REFERENCES ROLES 
    ( 
     RolId 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE roles_usuarios 
    ADD CONSTRAINT roles_usuarios_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_USUARIO_ID
    ) 
    REFERENCES USUARIO 
    ( 
     USUARIO_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Tipo_Aportante 
    ADD CONSTRAINT Tipo_Aportante_reportev1_FK FOREIGN KEY 
    ( 
     reportev1_ID_Reporte
    ) 
    REFERENCES reportev1 
    ( 
     ID_Reporte 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Tipo_Aportante 
    ADD CONSTRAINT Tipo_Aportante_Tipo_Evidencia_FK FOREIGN KEY 
    ( 
     Tipo_Evidencia_ID_Tipo_Evidencia, 
     Tipo_Evidencia_Evidencia_ID_Evidencia
    ) 
    REFERENCES Tipo_Evidencia 
    ( 
     ID_Tipo_Evidencia , 
     Evidencia_ID_Evidencia 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Tipo_Evidencia 
    ADD CONSTRAINT Tipo_Evidencia_Evidencia_FK FOREIGN KEY 
    ( 
     Evidencia_ID_Evidencia
    ) 
    REFERENCES Evidencia 
    ( 
     ID_Evidencia 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE USUARIO 
    ADD CONSTRAINT USUARIO_PERSONA_FK FOREIGN KEY 
    ( 
     PERSONA_DNI
    ) 
    REFERENCES PERSONA 
    ( 
     DNI 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            24
-- CREATE INDEX                            10
-- ALTER TABLE                             52
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE DATABASE                          0
-- CREATE DEFAULT                           0
-- CREATE INDEX ON VIEW                     0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE ROLE                              0
-- CREATE RULE                              0
-- CREATE SCHEMA                            0
-- CREATE SEQUENCE                          0
-- CREATE PARTITION FUNCTION                0
-- CREATE PARTITION SCHEME                  0
-- 
-- DROP DATABASE                            0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0