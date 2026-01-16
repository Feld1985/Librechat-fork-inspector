const fs = require('fs');
const path = require('path');
const { logger } = require('@librechat/data-schemas');

/**
 * Uploads a file to Anthropic's Files API for use with code execution.
 *
 * @param {Object} params - The params object.
 * @param {ServerRequest} params.req - The request object from Express.
 * @param {Express.Multer.File} params.file - The file uploaded to the server via multer.
 * @param {Anthropic} params.anthropic - The initialized Anthropic client.
 * @returns {Promise<{id: string, filename: string, bytes: number}>}
 */
async function uploadAnthropicFile({ req, file, anthropic }) {
  try {
    // Read file as a File object for the Anthropic SDK
    const fileBuffer = fs.readFileSync(file.path);
    const blob = new Blob([fileBuffer], { type: file.mimetype });
    const fileObj = new File([blob], file.originalname, { type: file.mimetype });

    const uploadedFile = await anthropic.beta.files.upload({
      file: fileObj,
    });

    logger.debug(
      `[uploadAnthropicFile] User ${req.user.id} successfully uploaded file to Anthropic`,
      {
        id: uploadedFile.id,
        filename: uploadedFile.filename,
        size: uploadedFile.size_bytes,
      },
    );

    return {
      id: uploadedFile.id,
      filename: uploadedFile.filename || file.originalname,
      bytes: uploadedFile.size_bytes || file.size,
    };
  } catch (error) {
    logger.error('[uploadAnthropicFile] Error uploading file to Anthropic: ' + error.message);
    throw error;
  }
}

/**
 * Deletes a file previously uploaded to Anthropic.
 *
 * @param {ServerRequest} req - The request object from Express.
 * @param {MongoFile} file - The database representation of the uploaded file.
 * @param {Anthropic} anthropic - The initialized Anthropic client.
 * @returns {Promise<void>}
 */
async function deleteAnthropicFile(req, file, anthropic) {
  try {
    await anthropic.beta.files.delete(file.file_id);
    logger.debug(
      `[deleteAnthropicFile] User ${req.user.id} successfully deleted file "${file.file_id}" from Anthropic`,
    );
  } catch (error) {
    // Anthropic may return 404 if file already deleted or expired
    if (error.status === 404) {
      logger.debug(
        `[deleteAnthropicFile] File "${file.file_id}" not found on Anthropic (may be expired or already deleted)`,
      );
      return;
    }
    logger.error('[deleteAnthropicFile] Error deleting file from Anthropic: ' + error.message);
    throw error;
  }
}

/**
 * Retrieves file content from Anthropic.
 *
 * @param {string} file_id - The Anthropic file_id.
 * @param {Anthropic} anthropic - The initialized Anthropic client.
 * @returns {Promise<ReadableStream>} A readable stream of the file.
 */
async function getAnthropicFileStream(file_id, anthropic) {
  try {
    const response = await anthropic.beta.files.retrieveContent(file_id);
    return response;
  } catch (error) {
    logger.error('[getAnthropicFileStream] Error getting Anthropic file stream:', error);
    throw error;
  }
}

module.exports = { uploadAnthropicFile, deleteAnthropicFile, getAnthropicFileStream };
