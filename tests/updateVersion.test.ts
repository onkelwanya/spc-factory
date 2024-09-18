import { updateVersion } from '../src/scripts/updateVersion';
import { promises as fs } from 'fs';
import * as readline from 'readline/promises';

/** Mocks */
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

jest.mock('readline/promises', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn(),
    close: jest.fn(),
  })),
}));

/** Tests */

describe('Version Update Script', () => {
  describe('updateVersion function', () => {
    it('should update version and write to file', async () => {
      const mockFileData = {
        version: '1.0.0',
        download: 'https://example.com/module/1.0.0/module.zip'
      };
      const newVersion = '2.0.0';
      const filePath = './module.json';
  
      (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockFileData));
      (fs.writeFile as jest.Mock).mockResolvedValueOnce(undefined);
  
      await updateVersion(filePath, newVersion);
  
      expect(fs.readFile).toHaveBeenCalledWith(filePath, 'utf-8');
      expect(fs.writeFile).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(
          {
            version: newVersion,
            download: `https://example.com/module/${ newVersion }/module.zip`,
          },
          null,
          2
        )
      );
    });

    it('should not update download URL if it does not exist', async () => {
      const mockFileData = {
        version: '1.0.0',
      };
      const newVersion = '2.0.0';
      const filePath = './module.json';

      (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockFileData));
      (fs.writeFile as jest.Mock).mockResolvedValueOnce(undefined);

      await updateVersion(filePath, newVersion);

      expect(fs.readFile).toHaveBeenCalledWith(filePath, 'utf-8');
      expect(fs.writeFile).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(
          {
            version: newVersion,
          },
          null,
          2
        )
      );
    });
  });
  describe('main function', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockReadline: any;

    beforeEach(() => {
      mockReadline = {
        question: jest.fn(),
        close: jest.fn(),
      };
      (readline.createInterface as jest.Mock).mockReturnValue(mockReadline);
    });
    it('should exit if the user declines version update', async () => {
      
      mockReadline.question.mockResolvedValueOnce('n');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify({ version: '1.0.0' }));

      const { main } = await import('../src/scripts/updateVersion');
      await main();

      expect(mockReadline.question).toHaveBeenCalledWith('Do you want to update the version? (y/n): ');
      expect(consoleSpy).toHaveBeenCalledWith('Version update cancelled. Exiting script.');
      mockReadline.close();
      consoleSpy.mockRestore();
    });
    it('should update the version when user agrees', async () => {
      const mockModuleData = {
        version: '1.0.0',
      };
      const newVersion = '2.0.0';

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModuleData));
      (fs.writeFile as jest.Mock).mockResolvedValueOnce(undefined);

      mockReadline.question
        .mockResolvedValueOnce('y')
        .mockResolvedValueOnce(newVersion);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const { main } = await import('../src/scripts/updateVersion');
      await main();

      expect(mockReadline.question).toHaveBeenCalledWith('Do you want to update the version? (y/n): ');
      expect(mockReadline.question).toHaveBeenCalledWith(`Enter the new version (current version: 1.0.0): `);
      expect(fs.writeFile).toHaveBeenCalledTimes(2); 

      mockReadline.close();
      consoleSpy.mockRestore();
    });
  });
});