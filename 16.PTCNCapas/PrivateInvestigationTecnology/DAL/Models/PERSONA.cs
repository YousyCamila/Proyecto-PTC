﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("PERSONA")]
public partial class PERSONA
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Persona { get; set; }

    [StringLength(20)]
    [Required] // Para asegurar que no es null en la base de datos
    public string DNI { get; set; } = null!;

    [StringLength(100)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Nombres { get; set; } = null!;

    [StringLength(100)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Apellidos { get; set; } = null!;

    [StringLength(100)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Correo { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Nacimiento { get; set; }

    [InverseProperty("Persona")]
    public virtual ADMINISTRADOR? ADMINISTRADOR { get; set; }

    [InverseProperty("Persona")]
    public virtual CLIENTE? CLIENTE { get; set; }

    [InverseProperty("Persona")]
    public virtual DETECTIVE? DETECTIVE { get; set; }
}
