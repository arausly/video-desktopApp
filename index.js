const electron =  require('electron');
const path =  require('path');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(path.join(__dirname, 'ffmpeg/ffmpeg-1/bin/ffmpeg.exe'));
ffmpeg.setFfprobePath(path.join(__dirname, 'ffmpeg/ffmpeg-1/bin/ffprobe.exe'));

const  { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready',()=>{
     mainWindow = new BrowserWindow({});
     mainWindow.loadURL(path.resolve(__dirname,'index.html'))
});

ipcMain.on('videoSubmitted',(event,path)=>{
        ffmpeg.ffprobe(path,(err,metadata)=>{
            mainWindow.webContents.send("videoDuration",metadata.format.duration);
        })
});
