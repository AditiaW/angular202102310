import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const otentikasiGuard: CanActivateFn = (route, state) => {
  console.log("Otentikasi dimulai");

  const userId = sessionStorage.getItem("userId");
  console.log("userId: " + userId);

  if (userId === null || userId === "undefined" || userId === "") {
    inject(Router).navigate(["/login"]);
    return false;
  }

  return true;
};
