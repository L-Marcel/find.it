"use client";

import Button from "@/components/button";
import {
  callCloseItemToast,
  callCreateItemToast,
  callLoginToast,
  callLogoutToast,
  callRegisterToast,
  callRemoveItemToast,
  callUnauthorizedToast,
  callUpdateItemToast,
  callUpdateUserToast,
} from "@/components/ui/toasts";

export default function Toaster() {
  //MARK: Remove this page on finish the app
  return (
    <>
      <Button onClick={() => callCloseItemToast()}>Close Item</Button>
      <Button onClick={() => callCreateItemToast()}>Create Item</Button>
      <Button onClick={() => callLoginToast()}>Login</Button>
      <Button onClick={() => callLogoutToast()}>Logout</Button>
      <Button onClick={() => callRegisterToast()}>Register</Button>
      <Button onClick={() => callRemoveItemToast()}>Remove Item</Button>
      <Button onClick={() => callUnauthorizedToast()}>Unauthorized</Button>
      <Button onClick={() => callUpdateItemToast()}>Update Item</Button>
      <Button onClick={() => callUpdateUserToast()}>Update User</Button>
    </>
  );
}
