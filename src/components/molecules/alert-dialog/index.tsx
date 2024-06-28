import { useDispatch } from "react-redux";

import { AButton } from "@/components/atoms/button";
import {
  ADialog,
  ADialogContent,
  ADialogDescription,
  ADialogFooter,
  ADialogHeader,
  ADialogOverlay,
  ADialogPortal,
  ADialogTitle,
} from "@/components/atoms/dialog";
import { useAppSelector } from "@/stores";
import { resetDialog } from "@/stores/alert-dialog";

export const MAlertDialog = () => {
  const dispatch = useDispatch();
  const alertDialog = useAppSelector((state) => state.alertDialog);

  const onClose = () => {
    dispatch(resetDialog());
  };

  return (
    <ADialog
      defaultOpen={alertDialog.isOpen}
      open={alertDialog.isOpen}
      onOpenChange={onClose}
      modal
    >
      <ADialogPortal>
        <ADialogOverlay />
        <ADialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <ADialogHeader>
            <ADialogTitle>{alertDialog.modalState.title}</ADialogTitle>
            <ADialogDescription>
              {alertDialog.modalState.description}
            </ADialogDescription>
          </ADialogHeader>
          {alertDialog.modalState.body}
          <ADialogFooter className="sm:justify-end sm:gap-x-2">
            <AButton type="button" variant="secondary" onClick={onClose}>
              Close
            </AButton>
            <AButton
              type="button"
              loading={alertDialog.loading}
              onClick={onClose}
            >
              Submit
            </AButton>
          </ADialogFooter>
        </ADialogContent>
      </ADialogPortal>
    </ADialog>
  );
};
