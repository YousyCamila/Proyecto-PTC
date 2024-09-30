﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using _17.PrivateInvestigationTechnology_PTC.Models.ViewModels;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _17.PrivateInvestigationTechnology_PTC.Logic;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    [Authorize(Roles = "Administrador, SuperUsuario")]
    public class UserRolesController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;
        private readonly RoleAssignmentService _roleAssignmentService;

        public UserRolesController(UserManager<ApplicationUser> userManager,
                                   RoleManager<IdentityRole> roleManager,
                                   ApplicationDbContext context,
                                   RoleAssignmentService roleAssignmentService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
            _roleAssignmentService = roleAssignmentService;
        }

        // Mostrar lista de usuarios y sus roles
        public async Task<IActionResult> Index()
        {
            var users = await _userManager.Users.ToListAsync();
            var userRolesViewModel = new List<UserRolesViewModel>();

            foreach (var user in users)
            {
                var thisViewModel = new UserRolesViewModel
                {
                    UserId = user.Id,
                    Email = user.Email,
                    Roles = new List<string>(await _userManager.GetRolesAsync(user)),
                    FullName = user.FullName,
                    PhoneNumber = user.PhoneNumber
                };
                userRolesViewModel.Add(thisViewModel);
            }

            return View(userRolesViewModel);
        }

        // GET: Gestión de roles para un usuario específico
        public async Task<IActionResult> Manage(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            var model = new List<ManageUserRolesViewModel>();
            foreach (var role in _roleManager.Roles)
            {
                var userRolesViewModel = new ManageUserRolesViewModel
                {
                    RoleId = role.Id,
                    RoleName = role.Name,
                    IsSelected = await _userManager.IsInRoleAsync(user, role.Name)
                };
                model.Add(userRolesViewModel);
            }

            ViewBag.UserId = user.Id;
            ViewBag.FullName = user.FullName;
            ViewBag.PhoneNumber = user.PhoneNumber;

            return View(model);
        }

        // POST: Asignar roles a un usuario y añadirlo a la tabla correspondiente
        [HttpPost]
        public async Task<IActionResult> Manage(string userId, List<ManageUserRolesViewModel> roles)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            // Obtener los roles actuales del usuario
            var currentRoles = await _userManager.GetRolesAsync(user);

            // Roles seleccionados en el formulario
            var selectedRoles = roles.Where(r => r.IsSelected).Select(r => r.RoleName).ToList();

            // Agregar nuevos roles seleccionados
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(currentRoles).ToList());
            if (!result.Succeeded)
            {
                ModelState.AddModelError("", "No se pudo agregar los roles.");
                return View(roles);
            }

            // Remover roles no seleccionados
            result = await _userManager.RemoveFromRolesAsync(user, currentRoles.Except(selectedRoles).ToList());
            if (!result.Succeeded)
            {
                ModelState.AddModelError("", "No se pudo remover los roles.");
                return View(roles);
            }

            // Asignar el usuario a la entidad correspondiente (Administrador, Cliente o Detective) dependiendo del rol asignado
            await _roleAssignmentService.AssignToEntityAsync(user, selectedRoles);

            return RedirectToAction("Index");
        }
    }
}
