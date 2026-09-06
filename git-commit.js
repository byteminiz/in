import git from 'isomorphic-git';
import fs from 'fs';

const dir = process.cwd();

async function run() {
  await git.init({ fs, dir });
  console.log('Git initialized successfully.');

  await git.setConfig({ fs, dir, path: 'user.name', value: 'byteminiz' });
  await git.setConfig({ fs, dir, path: 'user.email', value: 'byteminiz@gmail.com' });

  // Get status matrix to find all files to add
  const status = await git.statusMatrix({ fs, dir });
  
  for (const [filepath, head, worktree, stage] of status) {
    // If modified or untracked and not ignored
    if (worktree !== 0) {
      await git.add({ fs, dir, filepath });
    }
  }

  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'byteminiz',
      email: 'byteminiz@gmail.com',
    },
    message: 'Initial commit: Byte Miniz React PWA website'
  });

  console.log('SUCCESS: Committed with SHA:', sha);
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
