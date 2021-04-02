import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public users = [];

  private URL = 'http://localhost:5000/api/upload';
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
    maxFileSize: 1500 * 1024 * 1024,
    // disableMultipart : false,
    // autoUpload: true,
    // method: 'post',
    // itemAlias: 'attachment',
    // allowedFileType: ['image', 'pdf']
  });
  // private reader = new FileReader();
  public hasBaseDropZoneOver = true;
  public uploadedFiles = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.dataService.getUsers('/projects').subscribe((data) => {
      // console.log('ProjectsComponent: getUsers', data);
      this.authService.setToken(data?.token);
      if (Array.isArray(data.data)) {
        this.users = data.data;
      }
    });

    // this.reader.onload = (ev: any) => {
    //   (async () => {
    //     console.log('reader onload', ev.target.result);
    //   })();
    // };

    this.uploader.onAfterAddingFile = (fileItem: FileItem): any => {
      console.log('uploader onAfterAddingFile', fileItem);
    };

    this.uploader.onBeforeUploadItem = (fileItem: FileItem): any => {
      console.log('uploader onBeforeUploadItem', fileItem);
      fileItem.withCredentials = false;
      return { fileItem };
    };

    this.uploader.onProgressItem = (progress: any) => {
      console.log('onProgressItem : ' + progress['progress']);
      this.changeDetector.detectChanges();
    };

    this.uploader.onCompleteItem = (fileItem: FileItem): any => {
      console.log('uploader onCompleteItem', fileItem);
      this.uploadedFiles.push({
        name: fileItem.file.name,
        size: fileItem.file.size,
      });
    };

    this.uploader.onCompleteAll = (): any => {
      this.uploader.clearQueue();
    };
  }

  public UploadAll() {
    this.uploader.uploadAll();
  }

  public fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }
}
