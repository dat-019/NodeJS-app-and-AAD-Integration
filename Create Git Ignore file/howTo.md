https://stackoverflow.com/questions/32084281/exclude-folder-from-git-in-visual-studio-code

In short:
To generate any .gitignore file, Go to https://gitignore.io. Specific settings for 'VisualStudioCode' and various other tools and languages can be entered, and the site will generate a .gitignore file for you.

You would make a .gitignore file in the base directory of your git repository and add any files or folders that you would like to ignore. For the case you do not want to commit all files/folder inside a specific folder (e.g the node_modules folder), your file would contain: /node_modules/

You can add a .gitignore to any folder to create entries specific to that folder and its nested folders as well.
