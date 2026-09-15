--===============================================
-- SE CREA LA BASE DE DATOS
--===============================================
CREATE DATABASE DbiExamen;


USE DbiExamen;

--===============================================
-- SE CREA LA BASE TBL_EXAMEN
--===============================================

CREATE TABLE tbl_Examen(
fi_idExamen			 int identity(1,1) primary Key,
fc_Nombre			 varchar(255),
fc_Descripcion		 varchar(255),
fb_Estatus			 bit,
fd_falta			 datetime default getdate(),
fd_fechaModificacion datetime
);

go


/*
Autor: Jabo
fecha: 14/09/2026
Descripcion Stored de Alta de Examen BANSI
*/
CREATE PROCEDURE SP_ALTA_EXAMEN(
@fc_Nombre		varchar(255),
@fc_descripcion varchar(255)
)

as
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_Examen WHERE UPPER(fc_Nombre) = UPPER(@fc_Nombre))
	BEGIN
		SELECT retCodigo = 1, retVal= 'YA EXISTE UN REGISTRO CON ESE NOMBRE'
	END
	ELSE
	BEGIN
		INSERT INTO tbl_Examen (fc_Nombre,fc_Descripcion,fb_Estatus)
		VALUES (@fc_Nombre,@fc_descripcion,1)
		select retCodigo = 0 ,retVal='EL SE INSERTO SATISFACTORIAMENTE'
	END;
END TRY
BEGIN CATCH
		SELECT retCodigo =  CAST(ERROR_NUMBER() AS int), retVal ='Error: Ocurrió un error al registar la información: ' + ERROR_MESSAGE() ;
END CATCH;

GO

/*
Autor: Jabo
fecha: 14/09/2026
Descripcion Stored de Actualizacion de Examen BANSI
*/
CREATE PROCEDURE SP_ACTUALIZA_EXAMEN(
	@fi_idExamen int,
	@fc_Nombre		varchar(255),
	@fc_descripcion varchar(255)
)

as

BEGIN TRY

	if EXISTS(SELECT 1 FROM tbl_Examen WHERE UPPER(fc_Nombre) = UPPER(@fc_Nombre) AND fi_idExamen<> @fi_idExamen )
	BEGIN
		Select retCodigo = 1 , retVal='YA EXISTE UN REGISTRO CON ESE NOMBRE';
	END
	ELSE
	BEGIN
		update tbl_Examen
		Set fc_Nombre		= @fc_Nombre,
			fc_Descripcion	= @fc_descripcion,
			fd_fechaModificacion = GETDATE()

		Where fi_idExamen = @fi_idExamen
	
		Select retCodigo = 0 , retVal='REGISTRO SE ACTUALIZADO SATISFACTORIAMENTE';
	END
END TRY
BEGIN CATCH
	SELECT retCodigo =  CAST(ERROR_NUMBER() AS int), retVal ='Error: Ocurrió un error al registar la información: ' + ERROR_MESSAGE() ;
END CATCH

GO
/*
Autor: Jabo
fecha: 14/09/2026
Descripcion Stored de Eliminacion de Examen BANSI
fb_Activo
1 =  Activo
0 = Inactivo
*/

CREATE PROCEDURE SP_ELIMINA_EXAMEN(
@fi_idExamen int
)
as

	update tbl_Examen
		Set fb_Estatus			= 0,
			fd_fechaModificacion = GETDATE()

		Where fi_idExamen = @fi_idExamen
	
		Select retCodigo = 0 , retVal='REGISTRO SE CANCELO SATISFACTORIAMENTE';

GO

/*
Autor: Jabo
fecha: 14/09/2026
Descripcion Stored de Consulta de Examen BANSI
*/

CREATE PROCEDURE SP_CONSULTA_EXAMEN
(
@fi_idExamen int = 0
)
AS
SELECT 
		fi_idExamen,
		fc_Nombre,
		fc_Descripcion,
		fb_Estatus
FROM tbl_Examen
Where (fi_idExamen = @fi_idExamen or @fi_idExamen=0)





