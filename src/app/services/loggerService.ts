import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    constructor(private snackbar: MatSnackBar) {
    }

    log(x: string) {
        this.snackbar.open(x, "x", { duration: 2500 });
    }
}
